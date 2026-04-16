import Realm from './Realm';
export type RealmFactory = () => Promise<{
  default: new (...args: any[]) => Realm;
}>;

interface RegisteredRealm {
  id: string;
  name: string;
  loader: RealmFactory;
}

export class RealmLoader {
  private registry = new Map<string, RegisteredRealm>();
  private cache = new Map<string, Realm>();

  /**
   * Register a realm with a dynamic import loader.
   */
  registerRealm(id: string, name: string, loader: RealmFactory) {
    if (this.registry.has(id)) {
      throw new Error(`Realm '${id}' is already registered.`);
    }

    this.registry.set(id, { id, name, loader });
  }

  /**
   * Load a realm by ID. Uses cache if already loaded.
   */
  async loadRealm(id: string): Promise<Realm> {
    if (this.cache.has(id)) {
      return this.cache.get(id)!;
    }

    const entry = this.registry.get(id);
    if (!entry) {
      throw new Error(`Realm '${id}' is not registered.`);
    }

    const module = await entry.loader();
    const RealmClass = module.default;

    const instance = new RealmClass();

    await instance.load();
    this.cache.set(id, instance);

    return instance;
  }

  /**
   * Remove a realm from the load cache (e.g. after unload so the next load creates a fresh instance).
   */
  evictFromCache(id: string): void {
    this.cache.delete(id);
  }

  /**
   * Get a realm if already loaded.
   */
  getRealm(id: string): Realm | undefined {
    return this.cache.get(id);
  }

  /**
   * List all registered realms.
   */
  listRealms() {
    return Array.from(this.registry.values()).map((r) => ({
      id: r.id,
      name: r.name,
    }));
  }
}

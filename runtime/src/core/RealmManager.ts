import type Realm from "./Realm";

export default class RealmManager {
  private realms: Map<string, Realm> = new Map();
  private activeRealm: string | null = null;
  private listeners = new Set<() => void>();

  subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private emit(): void {
    for (const cb of this.listeners) cb();
  }

  registerRealm(realm: Realm) {
    if (!realm.id) {
      throw new Error("Realm must have an id property.");
    }
    realm.manager = this;
    this.realms.set(realm.id, realm);
    this.emit();
  }

  setActiveRealm(idOrRealm: string | Realm) {
    const id =
      typeof idOrRealm === "string" ? idOrRealm : idOrRealm.id;
    if (!this.realms.has(id)) {
      throw new Error(`Realm '${id}' is not registered.`);
    }
    this.activeRealm = id;
    this.emit();
  }

  getActiveRealm(): Realm | null {
    if (!this.activeRealm) return null;
    return this.realms.get(this.activeRealm) ?? null;
  }

  /** Snapshot of id → realm (safe copy; does not mutate internal registry). */
  getRealms(): Map<string, Realm> {
    return new Map(this.realms);
  }

  getRealmsList(): Realm[] {
    return Array.from(this.realms.values());
  }

  getActiveRealmComponent() {
    if (!this.activeRealm) return null;
    const realm = this.realms.get(this.activeRealm);
    if (!realm) return null;
    const mgr = this;
    return function ActiveRealmView() {
      const r = mgr.getActiveRealm();
      return r ? r.render() : null;
    };
  }
}

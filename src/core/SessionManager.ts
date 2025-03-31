import {ISessionStore} from "../storage/Interfaces/ISessionStore";
import {RedisStore} from "../storage/RedisStore";
import {StorageFactory} from "../storage/StorageFactory";

export class SessionManager {
    private store: ISessionStore;

    constructor(store?: string) {
        this.store = StorageFactory.getStorgae(store || "redis");
    }

    async save(sessionId: string, data: any) {
        await this.store.saveSession(sessionId, data);
    }

    async get(sessionId: string) {
        return await this.store.getSession(sessionId);
    }

    async delete(sessionId: string) {
        await this.store.deleteSession(sessionId);
    }
}

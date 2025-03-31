import {ISessionStore} from "./Interfaces/ISessionStore";

export class InMemoryStore implements ISessionStore{
    private store: Map<string, any>;
    constructor() {
        this.store = new Map();
    }
    async saveSession(sessionId: string, data: any): Promise<void> {
        this.store.set(sessionId, data);
    }
    async getSession(sessionId: string): Promise<any> {
        return this.store.get(sessionId);
    }
    async deleteSession(sessionId: string): Promise<void> {
        this.store.delete(sessionId);
    }
}


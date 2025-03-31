export interface ISessionStore {
    saveSession(sessionId: string, data: any): Promise<void>;
    getSession(sessionId: string): Promise<any>;
    deleteSession(sessionId: string): Promise<void>;
}

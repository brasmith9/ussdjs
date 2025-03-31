
import Redis from "ioredis";
import {ISessionStore} from "./Interfaces/ISessionStore";

export class RedisStore implements ISessionStore {
    private redis = new Redis();
    private redisKey: string = "ussd:";

    getKey(sessionId: string): string {
        return this.redisKey + sessionId;
    }

    async saveSession(sessionId: string, data: any) {
        await this.redis.set(this.getKey(sessionId), JSON.stringify(data), "EX", 300);
    }

    async getSession(sessionId: string) {
        const data = await this.redis.get(this.getKey(sessionId));
        return data ? JSON.parse(data) : null;
    }

    async deleteSession(sessionId: string) {
        await this.redis.del(this.getKey(sessionId));
    }
}

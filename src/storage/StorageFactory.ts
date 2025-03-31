import {RedisStore} from "./RedisStore";
import {InMemoryStore} from "./InMemoryStore";
import {UssdStorage} from "../models/UssdStorage";
import {ISessionStore} from "./Interfaces/ISessionStore";

export class StorageFactory {
    static getStorgae(storage: string) : ISessionStore {
        switch (storage) {
            case UssdStorage.REDIS:
                return new RedisStore();
            case UssdStorage.INMEMORY:
                return new InMemoryStore();
            default:
                throw new Error("Unsupported Storage Type");
        }
    }
}

import {UssdService} from "../core/UssdService";
import {UssdGateway} from "./UssdGateway";

export interface UssdConfig {
    gateway: UssdGateway;
    storage: "redis" | "memory" | "mongodb" | "mysql" | "postgres";
    resumeSession: boolean;
    customGateway?: any;
}

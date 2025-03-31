import { UssdGateway } from "../models/UssdGateway";
import {UssdConfig} from "../models/UssdConfig";
import {GatewayFactory} from "./GatewayHandler";
import {SessionManager} from "./SessionManager";
import {IGateway} from "../gateways/IGateway";

export class UssdService {
    private gateway: IGateway;
    private sessionStore: any;
    private enableSessionResume: boolean;
    private handlers: Map<string, Function>;

    constructor(private config: UssdConfig) {
        // Choose the correct gateway
        this.gateway =  GatewayFactory.getGateway(config.gateway);
        this.sessionStore = new SessionManager(config.storage);
        this.enableSessionResume = config.resumeSession;
        this.handlers = new Map();
    }

    on(step: string, handler: Function) {
        this.handlers.set(step, handler);
    }

    async handleRequest(sessionId: string, input: string, initialStep: string) {
        let session = { sessionId, input };

        if (this.enableSessionResume) {
            const savedState = await this.sessionStore.getSession(sessionId);
            if (savedState) {
                session = { ...session, ...savedState.sessionData };
                return await this.executeHandler(savedState.nextStep, session);
            }
        }

        return await this.executeHandler(initialStep, session);
    }

    private async executeHandler(step: string, session: any) {
        const handler = this.handlers.get(step);
        if (!handler) throw new Error(`No handler found for step: ${step}`);
        const response = await handler(session);
        await this.sessionStore.saveSession(session.sessionId, session, response.nextStep?.name);
        return response;
    }

     getRequest(body: any) {
        return this.gateway.parseRequest(body);
    }
    async clearSession(sessionId: string) {
        await this.sessionStore.clearSession(sessionId);
    }
}

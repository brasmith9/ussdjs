import {IGateway} from "./IGateway";
import {UssdRequest} from "../models/UssdRequest";
import {UssdResponse} from "../models/UssdResponse";

export class AfricasTalkingGateway implements IGateway{
    parseRequest(body: any): UssdRequest {
        return {
            sessionId: body.session_id,
            phoneNumber: body.msisdn,
            input: body.user_input,
        };
    }

    formatResponse(response: UssdResponse): any {
        return {
            message: response.message,
            action: response.type === "CONTINUE" ? "prompt" : "end",
            nextMenu: response.nextStep,
        };
    }
}

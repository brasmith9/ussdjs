import {UssdResponse} from "../models/UssdResponse";
import {UssdRequest} from "../models/UssdRequest";

export interface IGateway {
    parseRequest(body: any): UssdRequest;
    formatResponse(response: UssdResponse): any;
}

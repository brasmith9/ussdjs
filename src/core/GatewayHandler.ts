import {UssdGateway} from "../models/UssdGateway";
import {NaloGateway} from "../gateways/NaloGateway";
import {HubtelGateway} from "../gateways/HubtelGateway";
import {AfricasTalkingGateway} from "../gateways/AfricasTalkingGateway";


export class GatewayFactory {
    static getGateway(gateway: UssdGateway) {
        switch (gateway) {
            case UssdGateway.HUBTEL:
                return new HubtelGateway();
            case UssdGateway.NALO:
                return new NaloGateway();
            case UssdGateway.AFRICASTALKING:
                return new AfricasTalkingGateway();
            default:
                throw new Error("Unsupported USSD Gateway");
        }
    }
}

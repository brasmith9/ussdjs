import { Request, Response, NextFunction } from "express";
import {UssdService} from "../core/UssdService";
import {UssdConfig} from "../models/UssdConfig";

let ussdService: UssdService;

// Initialize the USSD service once
export const initializeUssdService = (config: UssdConfig) => {
    ussdService = new UssdService(config);
};
export const ussdMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const request = ussdService.getRequest(req.body);
    req.body = request;
};

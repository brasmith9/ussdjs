import express, { Express } from "express";
import { ussdMiddleware, initializeUssdService } from "./middlewares/UssdMiddleware";
import { UssdGateway } from "./models/UssdGateway";

const app: Express = express();
app.use(express.json());

// Initialize USSD service once
initializeUssdService({
    gateway: UssdGateway.HUBTEL,
    storage: "redis",
    resumeSession: true
});

// USSD Middleware
app.post("/ussd", ussdMiddleware);

const PORT = 3000;
app.listen(PORT, () => console.log(`USSD Server running on port ${PORT}`));

export interface UssdResponse {
    message: string;
    type: "CONTINUE" | "END";
    nextStep?: string;
}

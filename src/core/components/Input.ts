type DataType = "text" | "number" | "phone" | "date";

type UssdHandler = (session: any) => Promise<{ message: string; nextStep?: UssdHandler; endSession?: boolean }>;

export class Input {
    private label: string;
    private dataType: DataType;
    private nextStep: UssdHandler;

    constructor(label: string, dataType: DataType, nextStep: UssdHandler) {
        this.label = label;
        this.dataType = dataType;
        this.nextStep = nextStep;
    }

    validate(input: string): boolean {
        switch (this.dataType) {
            case "number":
                return /^\d+$/.test(input); // Only digits
            case "phone":
                return /^0\d{9}$/.test(input); // Ghana phone format: 024XXXXXXX
            case "date":
                return /^\d{4}-\d{2}-\d{2}$/.test(input); // YYYY-MM-DD
            case "text":
            default:
                return input.trim().length > 0;
        }
    }

    async handleInput(session: any): Promise<{ message: string; nextStep?: UssdHandler; endSession?: boolean }> {
        const input = session.input;

        if (!this.validate(input)) {
            return { message: `Invalid ${this.dataType}. Please enter again:`, nextStep: this.handleInput.bind(this) };
        }

        session[this.label] = input; // Store input in session
        return this.nextStep(session);
    }

    prompt(): string {
        return `Enter ${this.label}:`;
    }
}

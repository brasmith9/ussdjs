type UssdHandler = (session: any) => Promise<{ message: string; nextStep?: UssdHandler; endSession?: boolean }>;

export class Menu {
    private items: { label: string; action: UssdHandler }[] = [];
    private zeroItem?: { label: string; action: UssdHandler };

    addItem(label: string, action: UssdHandler): this {
        this.items.push({ label, action });
        return this;
    }

    addZeroItem(label = "Back", action: UssdHandler): this {
        this.zeroItem = { label, action };
        return this;
    }

    build(): string {
        let menuText = this.items.map((item, index) => `${index + 1}. ${item.label}`).join("\n");
        if (this.zeroItem) menuText += `\n0. ${this.zeroItem.label}`;
        return menuText;
    }

    async handleSelection(session: any): Promise<{ message: string; nextStep?: UssdHandler; endSession?: boolean }> {
        const input = session.input;
        if (input === "0" && this.zeroItem) return this.zeroItem.action(session);

        const selectedIndex = parseInt(input, 10) - 1;
        if (selectedIndex >= 0 && selectedIndex < this.items.length) {
            return this.items[selectedIndex].action(session);
        }

        return { message: "Invalid selection. Try again.", nextStep: this.handleSelection.bind(this) };
    }
}

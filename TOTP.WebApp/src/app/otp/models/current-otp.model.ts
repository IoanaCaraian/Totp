export class CurrentOtp {
    public pinCode: string;
    public remainingSeconds: number;

    constructor() {
        this.pinCode = '';
        this.remainingSeconds = 0;
    }
}

export class ResponseJSON {
    public message_type: string;
    public message: string;
    public error: boolean;
    public data: any;

    constructor(
        msgT: string,
        msg: string,
        error: boolean,
        data: any,
    ) {
        this.message = msg;
        this.message_type = msgT;
        this.error = error;
        this.data = data;
    }
}
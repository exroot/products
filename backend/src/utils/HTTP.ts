export interface IResponseArgs {
    message: string;
    messagesArray?: string[];
    statusCode: number;
    error: string;
}

export class HTTPServerError extends Error {
    readonly statusCode: number;
    readonly isCritical?: boolean;
    constructor(
        message: string,
        statusCode: number = 500,
        isCritical?: boolean
    ) {
        super();
        this.message = message;
        this.statusCode = statusCode;
        this.isCritical = isCritical;
    }
}

export class HTTPClientResponse extends Error {
    readonly statusCode: number;
    readonly error: string;
    readonly messagesArray: string[] | undefined;
    constructor(args?: IResponseArgs) {
        super();
        if (args) {
            // check if data has been provided
            this.message = args.message;
            this.statusCode = args.statusCode;
            this.error = args.error;
            this.messagesArray = args.messagesArray;
        } else {
            // if not, default initializers
            this.message = this.error = "Bad request";
            this.statusCode = 400;
        }
    }
}

export class Boom extends HTTPClientResponse {
    readonly statusCode: number;
    constructor(message: string, statusCode: number) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
    static badRequest(message?: string | string[]) {
        const responseData: IResponseArgs = {
            error: "Bad request",
            message: "",
            statusCode: 400,
        };
        if (!message) {
            responseData.message = responseData.error;
        } else {
            if (Array.isArray(message)) {
                responseData.messagesArray = message;
            } else {
                responseData.message = message;
            }
        }
        throw new HTTPClientResponse(responseData);
    }
    static unauthorized(message?: string) {
        const data: IResponseArgs = {
            error: "Unauthorized",
            message: message ? message : "Unauthorized",
            statusCode: 401,
        };
        throw new HTTPClientResponse(data);
    }
    static forbidden(message?: string) {
        const data: IResponseArgs = {
            error: "Forbidden",
            message: message ? message : "Forbidden",
            statusCode: 403,
        };
        throw new HTTPClientResponse(data);
    }
    static notFound(message?: string) {
        const data: IResponseArgs = {
            error: "Not found",
            message: message ? message : "Not found",
            statusCode: 404,
        };
        throw new HTTPClientResponse(data);
    }
}

export interface IResponseArgs {
    message: string;
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
    constructor(args?: IResponseArgs) {
        super();
        if (args) {
            // check if data has been provided
            this.message = args.message;
            this.statusCode = args.statusCode;
            this.error = args.error;
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
    static badRequest(message?: string) {
        const data: IResponseArg = {
            error: "Bad request",
            message: message ? message : "Bad request",
            statusCode: 400,
        };
        throw new HTTPClientResponse(data);
    }
    static unauthorized(message?: string) {
        const data: IResponseArg = {
            error: "Unauthorized",
            message: message ? message : "Unauthorized",
            statusCode: 401,
        };
        throw new HTTPClientResponse(data);
    }
    static forbidden(message?: string) {
        const data: IResponseArg = {
            error: "Forbidden",
            message: message ? message : "Forbidden",
            statusCode: 403,
        };
        throw new HTTPClientResponse(data);
    }
    static notFound(message?: string) {
        const data: IResponseArg = {
            error: "Not found",
            message: message ? message : "Not found",
            statusCode: 404,
        };
        throw new HTTPClientResponse(data);
    }
}

export class HTTPClientError extends Error {
    readonly statusCode: number;
    constructor(message: string, statusCode: number = 400) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
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

export abstract class HttpError extends Error {
    readonly statuscode!: Number;
    readonly message!: String;
}

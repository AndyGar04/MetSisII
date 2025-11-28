export class HttpError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class AuthenticationError extends HttpError {
    constructor(message = "Acceso denegado. Autenticación requerida.") {
        super(message, 401);
    }
}
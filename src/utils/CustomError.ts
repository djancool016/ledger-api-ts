import db from "../db";

export class AppError extends Error {
    public readonly statusCode: number;

    constructor(message: string = "Internal Server Error", statusCode: number = 500) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string = "Bad Request") {
        super(message, 400);
    }
}

export class AuthenticationError extends AppError {
    constructor(message: string = "Unauthorized") {
        super(message, 401);
    }
}

export class AuthorizationError extends AppError {
    constructor(message: string = "Forbidden Access") {
        super(message, 403);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = "Not Found") {
        super(message, 404);
    }
}

export class DuplicateError extends AppError {
    constructor(message: string = "Data already exist") {
        super(message, 409);
    }
}

export function databaseErrorHandler(error: any): never {
    if(error instanceof AppError) throw error

    const dbSystem = db.client.config.client;

    if (dbSystem === "pg") {
        return handlePostgreError(error);
    } else if (dbSystem === "sqlite3") {
        return handleSqliteError(error);
    }
    console.error(error)
    throw new AppError("Unknown database system error");
}

function handlePostgreError(error: any): never {
    switch (error.code) {
        case "23505": // Unique constraint violation
            throw new DuplicateError();
        case "23502": // NOT NULL constraint violation
        case "23503": // Foreign key constraint violation
        case "23514": // Check constraint violation
        case "22P02": // Data type mismatch (e.g., inserting a string into an integer column)
            throw new BadRequestError();
        default:
            console.error(error)
            throw new AppError("Database error");
    }
}

function handleSqliteError(error: any): never {
    switch (error.code) {
        case "SQLITE_CONSTRAINT":
            if (error.message.includes("PRIMARY KEY") || error.message.includes("UNIQUE")) {
                throw new DuplicateError();
            }
            throw new BadRequestError();
        case "SQLITE_ERROR":
        case "SQLITE_MISMATCH": // Data type mismatch
            throw new BadRequestError();
        default:
            console.error(error)
            throw new AppError("Database error");
    }
}

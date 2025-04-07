import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/CustomError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.error(err); // Log unexpected errors for debugging
    res.status(500).json({ message: "Internal Server Error" });
};
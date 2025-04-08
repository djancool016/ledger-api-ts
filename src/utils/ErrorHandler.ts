import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/CustomError";
import { z } from "zod";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        console.error(`${err.name}: ${err.message}`)
        return res.status(err.statusCode).json({ message: err.message });
    } else if(err instanceof z.ZodError){
        const message = err.errors.map( e => e.message ).join(', ')
        console.error(`BadRequestError: ${message}`)
        return res.status(400).json({message})
    }
    console.error(err); // Log unexpected errors for debugging
    res.status(500).json({ message: "Internal Server Error" });
};
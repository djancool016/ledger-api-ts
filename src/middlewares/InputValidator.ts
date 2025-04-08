import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod"

export type ValidatorOptions = {
    params?: ZodTypeAny;
    body?: ZodTypeAny;
    query?: ZodTypeAny;
}

export const validate = (options: ValidatorOptions) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if(options.params){
                req.params = options.params.parse(req.params);
            }
            if(options.body){
                req.body = options.body.parse(req.body);
            }
            if(options.query){
                req.query = options.query.parse(req.query);
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}
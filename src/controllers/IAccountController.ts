import { NextFunction, Request, Response } from "express"

export interface IAccountController {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    readAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
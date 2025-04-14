import { NextFunction, Request, Response } from "express";

interface ICreateRequest<T> {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
}
interface IReadRequest<T> {
    readAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    readById(req: Request, res: Response, next: NextFunction): Promise<void>;
}
interface IUpdateRequest<T> {
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
}
interface IDeleteRequest<T> {
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export type ICrudRequest<T> = ICreateRequest<T> & IReadRequest<T> & IUpdateRequest<T> & IDeleteRequest<T>
import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../utils/CustomError";
import { ICrud } from "../types/ICrud";
import { ICrudRequest } from "../types/ICrudRequest";

export abstract class Controller<T> implements ICrudRequest<T> {

    constructor(private service: ICrud<T>){}

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = await this.service.create(req.body)
            res.status(201).json({id, message: 'New data successfully added'})
            next()
        } catch (error) {
            next(error)
        }
    }
    async readAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
                const data = await this.service.readAll();
                res.status(200).json({data})
            } catch (error) {
                next(error)
            }
    }
    async readById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await this.service.readById(Number(req.params.id));
            res.status(200).json({data})
        } catch (error) {
            next(error)
        }
    }
    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const affectedRow = await this.service.update(Number(req.params.id), req.body)
            if(affectedRow > 0) res.status(200).json({message: 'Data successfully updated'})
            throw new NotFoundError
        } catch (error) {
            next(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const affectedRow = await this.service.delete(Number(req.params.id))
            if(affectedRow > 0) res.status(200).json({message: 'Data successfully deleted'})
            throw new NotFoundError
        } catch (error) {
            next(error)
        }
    }
    
}
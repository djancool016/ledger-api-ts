import { Request, Response, NextFunction } from "express";
import { IAccountController } from "./IAccountController";
import { inject, injectable } from "inversify";
import { IAccountService } from "../services/IAccountService";

@injectable()
export class AccountController implements IAccountController{
    constructor(@inject("AccountService") private accountService: IAccountService){}

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = await this.accountService.create(req.body);
            res.status(201).json({id, message: `New account successfully added.`})
        } catch (error) {
            next(error)
        }
    }
    async readAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.accountService.readAll()
            res.status(200).json({data: result})
        } catch (error) {
            next(error)
        }
    }
    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.accountService.update(Number(req.params.id), req.body)
            res.status(200).json({message: `Account successfully updated.`})
        } catch (error) {
            next(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.accountService.delete(Number(req.params.id))
            res.status(200).json({message: `Account successfully deleted.`})
        } catch (error) {
            next(error)
        }
    }

}
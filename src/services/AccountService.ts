import { inject, injectable } from "inversify";
import { IAccount } from "../models/IAccount";
import { ICrudRepo } from "../repositories/ICrudRepo";
import { IAccountService } from "./IAccountService";
import { NotFoundError } from "../utils/CustomError";

@injectable()
export class AccountService implements IAccountService{
    constructor(@inject("ICrudRepo") private accountRepo: ICrudRepo<IAccount>){}

    async create(data: Partial<IAccount>): Promise<number> {
        return this.accountRepo.create(data);
    }
    async readAll(): Promise<Partial<IAccount>[]> {
        const result = await this.accountRepo.readAll();
        if(result && result?.length > 0){
            return result.map(({ id, description }) => ({ id, description }));
        }
        throw new NotFoundError()
    }
    async readById(id: number): Promise<Partial<IAccount>> {
        const result = await this.accountRepo.readById(id);
        if(result){
            return { id: result.id, description: result.description }
        }
        throw new NotFoundError()
    }
    async update(id: number, data: Partial<IAccount>): Promise<number> {
        return this.accountRepo.update(id, data);
    }
    async delete(id: number): Promise<number> {
        return this.accountRepo.delete(id)
    }
}
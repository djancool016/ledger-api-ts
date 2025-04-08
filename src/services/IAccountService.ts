import { IAccount } from "../models/IAccount";

export interface IAccountService {
    create(data: Partial<IAccount>): Promise<number>;
    update(id: number, data: Partial<IAccount>): Promise<number>;
    delete(id: number): Promise<number>;
    readAll(): Promise<Partial<IAccount>[]>;
    readById(id: number): Promise<Partial<IAccount>>;
}
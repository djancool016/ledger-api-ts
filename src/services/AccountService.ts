import { inject, injectable } from "inversify";
import { IAccount } from "../models/IAccount";
import { Service } from "./Service";
import { ICrud } from "../types/ICrud";

@injectable()
export class AccountService extends Service<IAccount> {
    constructor(@inject("AccountRepo") repo: ICrud<IAccount>){
        super(repo)
    }
}
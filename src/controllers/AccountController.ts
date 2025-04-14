import { inject, injectable } from "inversify";
import { ICrud } from "../types/ICrud";
import { IAccount } from "../models/IAccount";
import { Controller } from "./Controller";

@injectable()
export class AccountController extends Controller<IAccount> {
    constructor(@inject("AccountService") service: ICrud<IAccount>){
        super(service)
    }
}
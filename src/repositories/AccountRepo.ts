import { inject, injectable } from "inversify";
import { IAccount } from "../models/IAccount";;
import { Knex } from "knex";
import { Repository } from "./Repository";

@injectable()
export class AccountRepo extends Repository<IAccount> {
    constructor(@inject('Knex') database: Knex){
        super('account', database);
    }
}
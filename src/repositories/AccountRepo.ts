import { inject, injectable } from "inversify";
import { IAccount } from "../models/IAccount";
import { CrudRepository } from "./CrudRepo";
import { Knex } from "knex";

@injectable()
export class AccountRepo extends CrudRepository<IAccount> {
    constructor(@inject('Knex') database: Knex){
        super('account', database);
    }
}
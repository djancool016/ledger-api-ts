import { inject, injectable } from "inversify";
import { Knex } from "knex";
import { Repository } from "./Repository";
import { ITransType } from "../models/ITransType";

@injectable()
export class TransTypeRepo extends Repository<ITransType> {
    constructor(@inject('Knex') database: Knex){
        super('transaction_type', database);
    }
}
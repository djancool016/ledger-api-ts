import { inject, injectable } from "inversify";
import { Knex } from "knex";
import { Repository } from "./Repository";
import { ITransEntries } from "../models/ITransEntries";

@injectable()
export class TransEntriesRepo extends Repository<ITransEntries> {
    constructor(@inject('Knex') database: Knex){
        super('transaction_entries', database);
    }
}
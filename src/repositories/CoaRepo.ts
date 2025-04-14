import { inject, injectable } from "inversify";
import { Repository } from "./Repository";
import { Knex } from "knex";
import { ICoa } from "../models/ICoa";

@injectable()
export class CoaRepo extends Repository<ICoa> {
    constructor(@inject('Knex') database: Knex){
        super('coa', database);
    }
}
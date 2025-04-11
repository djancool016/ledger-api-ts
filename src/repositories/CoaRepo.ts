import { inject, injectable } from "inversify";
import { CrudRepository } from "./CrudRepo";
import { Knex } from "knex";
import { ICoa } from "../models/ICoa";

@injectable()
export class CoaRepo extends CrudRepository<ICoa> {
    constructor(@inject('Knex') database: Knex){
        super('coa', database);
    }
}
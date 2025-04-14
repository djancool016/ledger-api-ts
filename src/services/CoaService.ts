import { inject, injectable } from "inversify";
import { ICoa } from "../models/ICoa";
import { Service } from "./Service";
import { ICrud } from "../types/ICrud";

@injectable()
export class CoaService extends Service<ICoa> {
    constructor(@inject("CoaRepo") repo: ICrud<ICoa>){
        super(repo)
    }
}
import { inject, injectable } from "inversify";
import { Service } from "./Service";
import { ICrud } from "../types/ICrud";
import { ITransType } from "../models/ITransType";

@injectable()
export class TransTypeService extends Service<ITransType> {
    constructor(@inject("TransTypeRepo") repo: ICrud<ITransType>){
        super(repo)
    }
}
import { inject, injectable } from "inversify";
import { ICrud } from "../types/ICrud";
import { Controller } from "./Controller";
import { ITransType } from "../models/ITransType";

@injectable()
export class TransTypeController extends Controller<ITransType> {
    constructor(@inject("TransTypeService") service: ICrud<ITransType>){
        super(service)
    }
}
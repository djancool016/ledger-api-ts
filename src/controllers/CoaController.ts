import { inject } from "inversify";
import { Controller } from "./Controller";
import { ICrud } from "../types/ICrud";
import { ICoa } from "../models/ICoa";

export class CoaController extends Controller<ICoa> {
    constructor(@inject("CoaService") service: ICrud<ICoa>){
        super(service)
    }
}
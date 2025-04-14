import { inject, injectable } from "inversify";
import { ICrud } from "../types/ICrud";
import { Controller } from "./Controller";
import { ITransEntries } from "../models/ITransEntries";

@injectable()
export class TransEntriesController extends Controller<ITransEntries> {
    constructor(@inject("TransEntriesService") service: ICrud<ITransEntries>){
        super(service)
    }
}
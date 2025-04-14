import { inject, injectable } from "inversify";
import { Service } from "./Service";
import { ICrud } from "../types/ICrud";
import { ITransEntries } from "../models/ITransEntries";

@injectable()
export class TransEntriesService extends Service<ITransEntries> {
    constructor(@inject("TransEntriesRepo") repo: ICrud<ITransEntries>){
        super(repo)
    }
}
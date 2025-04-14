import { ICrud } from "../types/ICrud";
import { NotFoundError } from "../utils/CustomError";

export abstract class Service<T> implements ICrud<T>{
    constructor(private repo: ICrud<T>){}

    async create(data: Partial<T>): Promise<number> {
        return this.repo.create(data);
    }
    async readAll(): Promise<Partial<T>[]> {
        const result = await this.repo.readAll();
        if(result && result.length > 0) return result
        throw new NotFoundError()
    }
    async readById(id: number): Promise<Partial<T>> {
        const result = await this.repo.readById(id);
        if(result) return result
        throw new NotFoundError()
    }
    async update(id: number, data: Partial<T>): Promise<number> {
        return this.repo.update(id, data);
    }
    async delete(id: number): Promise<number> {
        return this.repo.delete(id)
    }
}


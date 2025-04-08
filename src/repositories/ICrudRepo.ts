export interface ICrudRepo<T>{
    create(data: Partial<T>): Promise<number>;
    readAll(): Promise<T[] | null>;
    readById(id: number): Promise<T | null>;
    update(id: number, data: Partial<T>): Promise<number>;
    delete(id: number): Promise<number>;
}
interface ICreate<T> {
    create(data: Partial<T>): Promise<number>;
}
interface IRead<T> {
    readAll(): Promise<Partial<T>[]>;
    readById(id: number): Promise<Partial<T>>;
}
interface IUpdate<T> {
    update(id: number, data: Partial<T>): Promise<number>;
}
interface IDelete<T> {
    delete(id: number): Promise<number>;
}
export type ICrud<T> = ICreate<T> & IRead<T> & IUpdate<T> & IDelete<T>

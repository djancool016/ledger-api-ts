import { Knex } from "knex";
import { AppError, BadRequestError, databaseErrorHandler, NotFoundError } from "../utils/CustomError";
import db from "../db";
import { ICrudRepo } from "./ICrudRepo";

abstract class SqliteCrudRepo <T> implements ICrudRepo <T> {

    protected tableName: string;
    protected db: Knex;

    constructor(tableName: string, db: Knex) {
        this.tableName = tableName;
        this.db = db
    }
    async create(data: Partial<T>): Promise<number> {
        try {
            const [id] = await this.db(this.tableName).insert(data);
            if(!id) throw new BadRequestError('No data created');
            return id
        } catch (error) {
            databaseErrorHandler(error)
        }
    }
    async readAll(): Promise <T[]> {
        try {
            return this.db(this.tableName).select("*");
        } catch (error) {
            databaseErrorHandler(error)
        }
    }
    async readById(id: number): Promise <T | null> {
        try {
            const result = await this.db(this.tableName).where({id}).first();
            return result ?? null; // normalize undefined to null
        } catch (error) {
            databaseErrorHandler(error)
        }
    }
    async update(id: number, data: Partial<T>): Promise<number> {
        try {
            const affectedRows = await this.db(this.tableName)
                .where({ id })
                .update(data);
    
            if(affectedRows <= 0) throw new NotFoundError();
            return id
        } catch (error) {
            databaseErrorHandler(error)
        }
    }
    async delete(id: number): Promise<number> {
        try {
            const affectedRows = await this.db(this.tableName).where({id}).del();
            if(affectedRows <= 0) throw new NotFoundError();
            return id
        } catch (error) {
            databaseErrorHandler(error)
        }
    }
}

abstract class PostgreCrudRepo<T> extends SqliteCrudRepo<T> {
    async create(data: Partial<T>): Promise<number> {
        try {
            const [insertedRow] = await this.db(this.tableName).insert(data).returning('id');
            if(!insertedRow) throw new BadRequestError('No data created');
            return insertedRow.id
        } catch (error) {
            databaseErrorHandler(error)
        }
    }
}

export const CrudRepository = (() => {
    const dbClient = db.client.config.client

    switch (dbClient) {
        case 'pg':
            return PostgreCrudRepo
        case 'sqlite3':
            return SqliteCrudRepo
        default: 
            throw new AppError('Unknown database system')
    }
})()
import db from "../../db";
import { container } from "../../inversify.config";
import { IAccount } from "../../models/IAccount"
import { ICrudRepo } from "../../repositories/ICrudRepo";
import { BadRequestError, DuplicateError, NotFoundError } from "../../utils/CustomError";
import { TestHelper } from "../TestHelper";

describe('AccountRepo', () => {
    let repo: ICrudRepo<IAccount>;
    let sampleData: Partial<IAccount>;

    beforeAll(async() => {
        repo = container.get<ICrudRepo<IAccount>>('ICrudRepo');
        await db.migrate.latest();
        await db.seed.run();
    })

    afterAll(async() => {
        await db.destroy()
    })

    beforeEach(() => {
        sampleData = {
            description: "Testing account repo"
        }
    })

    TestHelper({
        describeText: 'create',
        success: [{
            method: async () => {
                const id = await repo.create(sampleData)
                return repo.readById(id)
            }, 
            output: () => expect.objectContaining(sampleData)
        }],
        error: [{
            method: () => repo.create({...sampleData, id: 1}), 
            output: () => new DuplicateError
        },{
            method: () => repo.create({...sampleData, unknown_column: 123123} as IAccount), 
            output: () => new BadRequestError
        }]
    })
    TestHelper({
        describeText: 'readAll',
        success: [{
            method: () => repo.readAll(),
            output: () => expect.arrayContaining([expect.objectContaining(sampleData)])
        }]
    })
    TestHelper({
        describeText: 'readById',
        success: [{
            method: () => repo.readById(1), 
            output: () => expect.objectContaining({id: 1})
        }],
        error: [{
            method: () => repo.readById(999), 
            output: () => null
        }]
    })
    TestHelper({
        describeText: 'update',
        success: [{
            method: async () => {
                const id = await repo.create(sampleData)
                return repo.update(id, sampleData)
            }, 
            output: () => expect.any(Number)
        }],
        error: [{
            method: () => repo.update(99999, sampleData), 
            output: () => new NotFoundError
        },{
            method: () => repo.update(1, {...sampleData, unknown_column: 123123} as IAccount), 
            output: () => new BadRequestError
        }]
    })
    TestHelper({
        describeText: 'delete',
        success: [{
            method: async () => {
                const id = await repo.create({...sampleData})
                return repo.delete(id)
            }, 
            output: () => expect.any(Number)
        }],
        error: [{
            method: () => repo.delete(99999), 
            output: () => new NotFoundError
        }]
    })
})
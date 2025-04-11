import db from "../../db";
import { container } from "../../inversify.config";
import { IAccount } from "../../models/IAccount"
import { ICrudRepo } from "../../repositories/ICrudRepo";
import { BadRequestError, DuplicateError, NotFoundError } from "../../utils/CustomError";
import { UnitTestHelper } from "../UnitTestHelper";

describe('AccountRepo', () => {
    let repo: ICrudRepo<IAccount>;
    let sampleData: Partial<IAccount>;

    beforeAll(async() => {
        repo = container.get<ICrudRepo<IAccount>>('AccountRepo');
        await db.migrate.latest();
        await db.seed.run();
    })

    afterAll(async() => {
        await db.destroy()
    })
    beforeEach(() => {
        sampleData = {
            description: "Testing account repo"
        };
    })

    UnitTestHelper('create', [
        {
            label:"Should success and returning user id",
            method: () => repo.create(sampleData),
            expected: expect.any(Number)
        },{
            label:"Should fail and throw DuplicateError on existing id",
            method: () => repo.create({...sampleData, id: 1}), 
            expected: new DuplicateError
        },{
            label:"Should fail and throw BadRequestError on unknown_column",
            method: () => repo.create({...sampleData, unknown_column: 123123} as IAccount), 
            expected: new BadRequestError
        }
    ])
    UnitTestHelper('readAll', [
        {
            label:"Should success and returning array of account",
            method: () => repo.readAll(),
            expected: expect.arrayContaining([expect.objectContaining({description: expect.any(String)})])
        }
    ])
    UnitTestHelper('readById', [
        {
            label:"Should success and returning an account",
            method: () => repo.readById(1),
            expected: expect.objectContaining({id: 1, description: expect.any(String)})
        },{
            label:"Should success and returning null",
            method: () => repo.readById(999999),
            expected: null
        }
    ])
    UnitTestHelper('update', [
        {
            label:"Should success and returning id",
            method: async () => {
                const id = await repo.create({description: "add test account"})
                return repo.update(id, {description: "test updating description"})
            },
            expected: expect.any(Number)
        },{
            label:"Fail should throw NotFoundError on unknown id",
            method: () => repo.update(99454, {description: "test updating description"}),
            expected: new NotFoundError
        },{
            label:"Fail should throw BadRequestError on unknown column",
            method: () => repo.update(1, { unknown_col: "123" } as unknown as IAccount),
            expected: new BadRequestError
        }
    ])
    UnitTestHelper('delete', [
        {
            label:"Should success and returning deleted id",
            method: async () => {
                const id = await repo.create({...sampleData})
                return repo.delete(id)
            },
            expected: expect.any(Number)
        },{
            label:"Fail should thorw NotFoundError",
            method: () => repo.delete(999999),
            expected: new NotFoundError
        }
    ])
})
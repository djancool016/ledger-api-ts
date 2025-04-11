import db from "../../db";
import { container } from "../../inversify.config";
import { ICoa } from "../../models/ICoa";
import { ICrudRepo } from "../../repositories/ICrudRepo";
import { BadRequestError, DuplicateError, NotFoundError } from "../../utils/CustomError";
import { randomNumber, randomString } from "../test-utils";
import { UnitTestHelper } from "../UnitTestHelper";

describe('AccountRepo', () => {
    let repo: ICrudRepo<ICoa>;
    let randomSampleData = (): Partial<ICoa> => {
        return {
            account_id: 1,
            code: randomNumber(4),
            description: randomString(10)
        }
    }
    let expectedSample: Partial<ICoa> = {
        account_id: expect.any(Number),
        code: expect.any(Number),
        description: expect.any(String)
    }
    beforeAll(async() => {
        repo = container.get<ICrudRepo<ICoa>>('CoaRepo');
        await db.migrate.latest();
        await db.seed.run();
    })

    afterAll(async() => {
        await db.destroy()
    })
    UnitTestHelper('create', [
        {
            label: "Should success and returning coa id",
            method: () => repo.create(randomSampleData()),
            expected: expect.any(Number)
        }, {
            label: "Should fail and throw DuplicateError on existing code",
            method: () => repo.create({ ...randomSampleData(), code: 1010 }),
            expected: new DuplicateError
        }, {
            label: "Should fail and throw BadRequestError on unknown_column",
            method: () => repo.create({ ...randomSampleData(), unknown_column: 123123 } as ICoa),
            expected: new BadRequestError
        }
    ])
    UnitTestHelper('readAll', [
        {
            label: "Should success and returning array of coa",
            method: () => repo.readAll(),
            expected: expect.arrayContaining([expect.objectContaining(expectedSample)])
        }
    ])
    UnitTestHelper('readById', [
        {
            label: "Should success and returning a coa",
            method: () => repo.readById(1),
            expected: expect.objectContaining(expectedSample)
        }, {
            label: "Should success and returning null",
            method: () => repo.readById(999999),
            expected: null
        }
    ])
    UnitTestHelper('update', [
        {
            label: "Should success and returning total of affected rows",
            method: async () => {
                const id = await repo.create(randomSampleData())
                return repo.update(id, randomSampleData())
            },
            expected: expect.any(Number)
        }, {
            label: "Should fail and throw NotFoundError on unknown id",
            method: () => repo.update(999999, randomSampleData()),
            expected: new NotFoundError
        }, {
            label: "Should fail and throw BadRequestError on unknown column",
            method: () => repo.update(1, { ...randomSampleData(), unknown_column: 123123 } as ICoa),
            expected: new BadRequestError
        }
    ])
    UnitTestHelper('delete', [
        {
            label: "Should success and returning total of affected rows",
            method: async () => {
                const id = await repo.create(randomSampleData())
                return repo.delete(id)
            },
            expected: expect.any(Number)
        }, {
            label: "Should fail and throw NotFoundError",
            method: () => repo.delete(999999),
            expected: new NotFoundError
        }
    ])
})
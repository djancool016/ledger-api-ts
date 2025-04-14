import db from "../../db";
import { ICrud } from "../../types/ICrud";
import { BadRequestError, DuplicateError, NotFoundError } from "../../utils/CustomError";
import { randomNumber } from "../test-utils";
import { UnitTestHelper } from "../UnitTestHelper";

type RepoTestSuiteOpt<T> = {
    repository: ICrud<T>,
    mockInput: () => Partial<T>,
    expected: () => Partial<T>
}

export function repositoryTestSuite<T>({repository, mockInput, expected}: RepoTestSuiteOpt<T>) {

    beforeAll(async() => {
        await db.migrate.latest();
        await db.seed.run();
    })

    afterAll(async() => {
        await db.destroy()
    })

    return {
        create: () => UnitTestHelper('create', [
            {
                label: "Should succeed and return id",
                method: () => repository.create(mockInput()),
                expected: expect.any(Number)
            },
            {
                label: "Should fail and throw DuplicateError on existing id",
                method: async () => {
                    const input = mockInput();
                    const id = await repository.create(input);
                    return repository.create({ ...input, id });
                },
                expected: new DuplicateError()
            },
            {
                label: "Should fail and throw BadRequestError on unknown column",
                method: () => repository.create({ ...mockInput(), unknown_column: "unknown" } as T),
                expected: new BadRequestError()
            }
        ]),
        readAll: () => UnitTestHelper('readAll', [
            {
                label: "Should succeed and return an array of data",
                method: () => repository.readAll(),
                expected: expect.arrayContaining([expect.objectContaining(expected())])
            }
        ]),
        readById: () => UnitTestHelper('readById', [
            {
                label: "Should succeed and return an data",
                method: async () => {
                    const id = await repository.create(mockInput());
                    return repository.readById(id);
                },
                expected: expect.objectContaining(expected())
            },
            {
                label: "Should fail and throw NotFoundError",
                method: () => repository.readById(randomNumber(10)),
                expected: new NotFoundError()
            }
        ]),
        update: () => UnitTestHelper('update', [
            {
                label: "Should succeed and return number of affected row",
                method: async () => {
                    const id = await repository.create(mockInput());
                    return repository.update(id, mockInput());
                },
                expected: expect.any(Number)
            },
            {
                label: "Should fail and throw NotFoundError on unknown id",
                method: () => repository.update(randomNumber(10), mockInput()),
                expected: new NotFoundError()
            },
            {
                label: "Should fail and throw BadRequestError on unknown column",
                method: async () => {
                    const id = await repository.create(mockInput());
                    return repository.update(id, { ...mockInput(), unknown_column: "unknown" } as T);
                },
                expected: new BadRequestError()
            }
        ]),
        delete: () => UnitTestHelper('delete', [
            {
                label: "Should succeed and return number of affected row",
                method: async () => {
                    const id = await repository.create(mockInput());
                    return repository.delete(id);
                },
                expected: expect.any(Number)
            },
            {
                label: "Should fail and throw NotFoundError",
                method: () => repository.delete(randomNumber(10)),
                expected: new NotFoundError()
            }
        ])
    }
}

import { ICrud } from "../../types/ICrud"
import { BadRequestError, DuplicateError, NotFoundError } from "../../utils/CustomError";
import { randomNumber } from "../test-utils";
import { UnitTestHelper } from "../UnitTestHelper";

type ServiceTestSuiteOpt<T> = {
    service: ICrud<T>;
    repository: ICrud<T>;
    mockInput: () => Partial<T>;
    expected: () => Partial<T>;
}

export function serviceTestSuite<T>({service, repository, mockInput, expected}: ServiceTestSuiteOpt<T>){
    afterEach(() => {
        jest.restoreAllMocks();
    })
    return {
        create: () => UnitTestHelper('create', [
            {
                label:"Should success and returning user id",
                setup: () => jest.spyOn(repository, 'create').mockResolvedValue(1),
                method: () => service.create(mockInput()),
                expected: expect.any(Number)
            },{
                label:"Should fail and throw DuplicateError on existing id",
                setup: () => jest.spyOn(repository, 'create').mockRejectedValue(new DuplicateError),
                method: () => service.create({...mockInput(), id: 1}),
                expected: new DuplicateError
            },{
                label:"Should fail and throw BadRequestError on invalid column",
                setup: () => jest.spyOn(repository, 'create').mockRejectedValue(new BadRequestError),
                method: () => service.create({...mockInput(), unknown_column: "unknown"} as T),
                expected: new BadRequestError
            }
        ]),
        readAll: () => UnitTestHelper('readAll', [
            {
                label:"Should success and returning array of account",
                setup: () => jest.spyOn(repository, 'readAll').mockResolvedValue([{id: randomNumber(100),...mockInput()}]),
                method: () => service.readAll(),
                expected: expect.arrayContaining([expect.objectContaining(expected())])
            },{
                label:"Should fail and throw NotFoundError",
                setup: () => jest.spyOn(repository, 'readAll').mockRejectedValue(new NotFoundError),
                method: () => service.readAll(),
                expected: new NotFoundError
            }
        ]),
        readById: () => UnitTestHelper('readById', [
            {
                label:"Should success and returning an account",
                setup: () => jest.spyOn(repository, 'readById').mockResolvedValue({id: 1, ...mockInput()}),
                method: () => service.readById(1),
                expected: expect.objectContaining(expected())
            },{
                label:"Should fail and returning null on unknown id",
                setup: () => jest.spyOn(repository, 'readById').mockRejectedValue(new NotFoundError),
                method: () => service.readById(randomNumber(10)),
                expected: new NotFoundError
            }
        ]),
        update: () => UnitTestHelper('update', [
            {
                label:"Should success and returning 1",
                setup: () => jest.spyOn(repository, 'update').mockResolvedValue(1),
                method: () => service.update(1, mockInput()), 
                expected: expect.any(Number)
            },{
                label:"Unknown id should throw NotFoundError",
                setup: () => jest.spyOn(repository, 'update').mockRejectedValue(new NotFoundError),
                method: () => service.update(randomNumber(10), mockInput()), 
                expected: new NotFoundError
            },{
                label:"Invalid request should throw BadRequestError",
                setup: () => jest.spyOn(repository, 'update').mockRejectedValue(new BadRequestError),
                method: () => service.update(1, {...mockInput(), unknown_column: "unknown"} as T), 
                expected: new BadRequestError
            }
        ]),
        delete: () => UnitTestHelper('delete', [
            {
                label:"Should success and returning deleted id",
                setup: () => jest.spyOn(repository, 'delete').mockResolvedValue(1),
                method: () => service.delete(1),
                expected: expect.any(Number)
            },{
                label:"Fail should thorw NotFoundError",
                setup: () => jest.spyOn(repository, 'delete').mockRejectedValue(new NotFoundError),
                method: () => service.delete(randomNumber(10)),
                expected: new NotFoundError
            }
        ])
    }
}
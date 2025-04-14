import { container } from "../../inversify.config";
import { ICoa } from "../../models/ICoa";
import { BadRequestError, DuplicateError, NotFoundError } from "../../utils/CustomError";
import { randomNumber, randomString } from "../test-utils";
import { UnitTestHelper } from "../UnitTestHelper";
import { CoaRepo } from "../../repositories/CoaRepo";
import { ICrud } from "../../types/ICrud";
import { serviceTestSuite } from "./ServiceTestSuite";

describe('AccountService', () => {
    const testSuite = serviceTestSuite<ICoa>({
        service: container.get<ICrud<ICoa>>("CoaService"),
        repository: CoaRepo.prototype,
        mockInput: () => {
            return {
                account_id: 1,
                code: randomNumber(4),
                description: randomString(10)
            }
        },
        expected: () => {
            return {
                id: expect.any(Number),
                account_id: expect.any(Number),
                code: expect.any(Number),
                description: expect.any(String)
            }
        }
    })
    const testedMethods = ['create', 'readAll', 'readById', 'update', 'delete'] as const;
    testedMethods.forEach((method) => testSuite[method as keyof typeof testSuite]());
})
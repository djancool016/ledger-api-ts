import { container } from "../../inversify.config";
import { ICoa } from "../../models/ICoa";
import { BadRequestError, DuplicateError, NotFoundError } from "../../utils/CustomError";
import { randomNumber, randomString } from "../test-utils";
import { UnitTestHelper } from "../UnitTestHelper";
import { CoaRepo } from "../../repositories/CoaRepo";
import { ICrud } from "../../types/ICrud";
import { serviceTestSuite } from "./ServiceTestSuite";
import { mockData, mockExpect } from "../MockData";

describe('AccountService', () => {
    const testSuite = serviceTestSuite<ICoa>({
        service: container.get<ICrud<ICoa>>("CoaService"),
        repository: CoaRepo.prototype,
        mockInput: () => mockData.coa,
        expected: () => mockExpect.coa
    })
    const testedMethods = ['create', 'readAll', 'readById', 'update', 'delete'] as const;
    testedMethods.forEach((method) => testSuite[method as keyof typeof testSuite]());
})
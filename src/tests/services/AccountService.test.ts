import { container } from "../../inversify.config";
import { IAccount } from "../../models/IAccount"
import { AccountRepo } from "../../repositories/AccountRepo";
import { ICrud } from "../../types/ICrud";
import { mockData, mockExpect } from "../MockData";
import { randomString } from "../test-utils";
import { serviceTestSuite } from "./ServiceTestSuite";

describe('AccountService', () => {
    const testSuite = serviceTestSuite<IAccount>({
        service: container.get<ICrud<IAccount>>("AccountService"),
        repository: AccountRepo.prototype,
        mockInput: () => mockData.account,
        expected: () => mockExpect.account
    })
    const testedMethods = ['create', 'readAll', 'readById', 'update', 'delete'] as const;
    testedMethods.forEach((method) => testSuite[method as keyof typeof testSuite]());
})
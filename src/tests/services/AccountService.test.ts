import { container } from "../../inversify.config";
import { IAccount } from "../../models/IAccount"
import { AccountRepo } from "../../repositories/AccountRepo";
import { ICrud } from "../../types/ICrud";
import { randomString } from "../test-utils";
import { serviceTestSuite } from "./ServiceTestSuite";

describe('AccountService', () => {
    const testSuite = serviceTestSuite<IAccount>({
        service: container.get<ICrud<IAccount>>("AccountService"),
        repository: AccountRepo.prototype,
        mockInput: () => {
            return {
                description: randomString(10)
            }
        },
        expected: () => {
            return {
                id: expect.any(Number),
                description: expect.any(String)
            }
        }
    })
    const testedMethods = ['create', 'readAll', 'readById', 'update', 'delete'] as const;
    testedMethods.forEach((method) => testSuite[method as keyof typeof testSuite]());
})
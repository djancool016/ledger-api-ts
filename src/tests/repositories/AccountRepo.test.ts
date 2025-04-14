import { container } from "../../inversify.config";
import { IAccount } from "../../models/IAccount"
import { ICrud } from "../../types/ICrud";
import { randomString } from "../test-utils";
import { repositoryTestSuite } from "./RepositoryTestSuite";

describe('AccountRepo', () => {
    const testSuite = repositoryTestSuite<IAccount>({
        repository: container.get<ICrud<IAccount>>('AccountRepo'),
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
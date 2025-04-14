import { container } from "../../inversify.config";
import { ICoa } from "../../models/ICoa";
import { ICrud } from "../../types/ICrud";
import { randomNumber, randomString } from "../test-utils";
import { repositoryTestSuite } from "./RepositoryTestSuite";

describe('CoaRepo', () => {
    const testSuite = repositoryTestSuite<ICoa>({
        repository: container.get<ICrud<ICoa>>('CoaRepo'),
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
import { container } from "../../inversify.config";
import { IAccount } from "../../models/IAccount"
import { ICrud } from "../../types/ICrud";
import { mockData, mockExpect } from "../MockData";
import { repositoryTestSuite } from "./RepositoryTestSuite";

describe('AccountRepo', () => {
    const testSuite = repositoryTestSuite<IAccount>({
        repository: container.get<ICrud<IAccount>>('AccountRepo'),
        mockInput: () => mockData().account,
        expected: () => mockExpect.account
    })
    const testedMethods = ['create', 'readAll', 'readById', 'update', 'delete'] as const;
    testedMethods.forEach((method) => testSuite[method as keyof typeof testSuite]());
})
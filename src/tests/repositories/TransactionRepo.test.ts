import { container } from "../../inversify.config";
import { ITransType } from "../../models/ITransType";
import { ICrud } from "../../types/ICrud";
import { mockData, mockExpect } from "../MockData";
import { repositoryTestSuite } from "./RepositoryTestSuite";

describe('AccountRepo', () => {
    const testSuite = repositoryTestSuite<ITransType>({
        repository: container.get<ICrud<ITransType>>('TransTypeRepo'),
        mockInput: () => mockData.transType,
        expected: () => mockExpect.transType
    })
    const testedMethods = ['create', 'readAll', 'readById', 'update', 'delete'] as const;
    testedMethods.forEach((method) => testSuite[method as keyof typeof testSuite]());
})
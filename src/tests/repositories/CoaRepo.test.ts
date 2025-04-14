import { container } from "../../inversify.config";
import { ICoa } from "../../models/ICoa";
import { ICrud } from "../../types/ICrud";
import { mockData, mockExpect } from "../MockData";
import { repositoryTestSuite } from "./RepositoryTestSuite";

describe('CoaRepo', () => {
    const testSuite = repositoryTestSuite<ICoa>({
        repository: container.get<ICrud<ICoa>>('CoaRepo'),
        mockInput: () => mockData().coa,
        expected: () => mockExpect.coa
    })
    const testedMethods = ['create', 'readAll', 'readById', 'update', 'delete'] as const;
    testedMethods.forEach((method) => testSuite[method as keyof typeof testSuite]());
})
import { container } from "../../inversify.config";
import { ITransEntries } from "../../models/ITransEntries";
import { ICrud } from "../../types/ICrud";
import { mockData, mockExpect } from "../MockData";
import { repositoryTestSuite } from "./RepositoryTestSuite";

describe('AccountRepo', () => {
    const testSuite = repositoryTestSuite<ITransEntries>({
        repository: container.get<ICrud<ITransEntries>>('TransEntriesRepo'),
        mockInput: () => mockData().transEntries,
        expected: () => {return {...mockExpect.transEntries, is_credit: expect.any(Number)}}
    })
    const testedMethods = ['create', 'readAll', 'readById', 'update', 'delete'] as const;
    testedMethods.forEach((method) => testSuite[method as keyof typeof testSuite]());
})
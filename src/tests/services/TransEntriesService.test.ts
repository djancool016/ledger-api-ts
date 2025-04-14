import { container } from "../../inversify.config";
import { ITransEntries } from "../../models/ITransEntries";
import { TransEntriesService } from "../../services/TransEntriesService";
import { ICrud } from "../../types/ICrud";
import { mockData, mockExpect } from "../MockData";
import { serviceTestSuite } from "./ServiceTestSuite";

describe('AccountService', () => {
    const testSuite = serviceTestSuite<ITransEntries>({
        service: container.get<ICrud<ITransEntries>>("TransEntriesService"),
        repository: TransEntriesService.prototype,
        mockInput: () => mockData().transEntries,
        expected: () => mockExpect.transEntries
    })
    const testedMethods = ['create', 'readAll', 'readById', 'update', 'delete'] as const;
    testedMethods.forEach((method) => testSuite[method as keyof typeof testSuite]());
})
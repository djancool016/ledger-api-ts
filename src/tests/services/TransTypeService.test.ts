import { container } from "../../inversify.config";
import { ITransType } from "../../models/ITransType";
import { TransTypeService } from "../../services/TransTypeService";
import { ICrud } from "../../types/ICrud";
import { mockData, mockExpect } from "../MockData";
import { serviceTestSuite } from "./ServiceTestSuite";

describe('AccountService', () => {
    const testSuite = serviceTestSuite<ITransType>({
        service: container.get<ICrud<ITransType>>("TransTypeService"),
        repository: TransTypeService.prototype,
        mockInput: () => mockData().transType,
        expected: () => mockExpect.transType
    })
    const testedMethods = ['create', 'readAll', 'readById', 'update', 'delete'] as const;
    testedMethods.forEach((method) => testSuite[method as keyof typeof testSuite]());
})
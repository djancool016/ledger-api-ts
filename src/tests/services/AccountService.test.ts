import { container } from "../../inversify.config";
import { IAccount } from "../../models/IAccount"
import { AccountRepo } from "../../repositories/AccountRepo";
import { IAccountService } from "../../services/IAccountService";
import { BadRequestError, DuplicateError, NotFoundError } from "../../utils/CustomError";
import { TestHelper } from "../TestHelper";

describe('AccountService', () => {
    let service: IAccountService;
    let mockData: Partial<IAccount>;

    beforeAll(async() => {
        service = container.get<IAccountService>('IAccountService');
    })

    afterEach(() => {
        jest.restoreAllMocks();
    })

    beforeEach(() => {
        mockData = {
            id: 1,
            description: "Testing account service"
        }
    })

    TestHelper({
        describeText: 'create',
        success: [{
            label: "Success insert new data should returning id",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'create').mockResolvedValue(1);
                return service.create(mockData)
            }, 
            output: () => 1
        }],
        error: [{
            label: "Inserting existing data should throw DuplicateError",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'create').mockRejectedValue(new DuplicateError);
                return service.create(mockData)
            }, 
            output: () => new DuplicateError
        },{
            label: "Invalid column should throw BadRequestError",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'create').mockRejectedValue(new BadRequestError);
                return service.create({...mockData, unknown_col: "unkwnond"} as IAccount)
            }, 
            output: () => new BadRequestError
        }]
    })
    TestHelper({
        describeText: 'readAll',
        success: [{
            label: "Success should returning array",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'readAll').mockResolvedValue([mockData as IAccount])
                return service.readAll()
            },
            output: () => expect.arrayContaining([expect.objectContaining(mockData)])
        }],
        error: [{
            label: "No data should throw NotFoundError",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'readAll').mockRejectedValue(new NotFoundError)
                return service.readAll()
            }, 
            output: () => new NotFoundError
        }]
    })
    TestHelper({
        describeText: 'readById',
        success: [{
            label: "Success should returning object",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'readById').mockResolvedValue(mockData as IAccount)
                return service.readById(1)
            },
            output: () => expect.objectContaining(mockData)
        }],
        error: [{
            label: "No data should returning null",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'readById').mockRejectedValue(new NotFoundError)
                return service.readById(999999)
            }, 
            output: () => new NotFoundError
        }]
    })
    TestHelper({
        describeText: 'update',
        success: [{
            label: "Success should returning 1",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'update').mockResolvedValue(1)
                return service.update(1, mockData)
            }, 
            output: () => 1
        }],
        error: [{
            label: "Unknown id should throw NotFoundError",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'update').mockRejectedValue(new NotFoundError)
                return service.update(99999, mockData)
            }, 
            output: () => new NotFoundError
        },{
            label: "Invalid column should throw BadRequestError",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'update').mockRejectedValue(new BadRequestError)
                return service.update(1, {...mockData, unknown_column: 123123} as IAccount)
            }, 
            output: () => new BadRequestError
        }]
    })
    TestHelper({
        describeText: 'delete',
        success: [{
            label: "Success should returning 1",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'delete').mockResolvedValue(1)
                return service.delete(1)
            }, 
            output: () => expect.any(Number)
        }],
        error: [{
            label: "Unknown id should throw NotFoundError",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'delete').mockRejectedValue(new NotFoundError)
                return service.delete(99999)
            }, 
            output: () => new NotFoundError
        }]
    })
})
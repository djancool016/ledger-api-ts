import { container } from "../../inversify.config";
import { IAccount } from "../../models/IAccount"
import { AccountRepo } from "../../repositories/AccountRepo";
import { IAccountService } from "../../services/IAccountService";
import { BadRequestError, DuplicateError, NotFoundError } from "../../utils/CustomError";
import { UnitTestHelper } from "../UnitTestHelper";

describe('AccountService', () => {
    let service: IAccountService;
    let mockData: Partial<IAccount> = {
        id: expect.any(Number),
        description: expect.any(String)
    };

    beforeAll(async() => {
        service = container.get<IAccountService>('AccountService');
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

    UnitTestHelper('create', [
        {
            label:"Should success and returning user id",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'create').mockResolvedValue(1);
                return service.create({description: "Add new account"})
            },
            expected: expect.any(Number)
        },{
            label:"Should fail and throw DuplicateError on existing id",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'create').mockRejectedValue(new DuplicateError);
                return service.create({id: 1, description: "Add new account"})
            },
            expected: new DuplicateError
        },{
            label:"Should fail and throw BadRequestError on invalid column",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'create').mockRejectedValue(new BadRequestError);
                return service.create({...mockData, unknown_col: "unkwnond"} as IAccount)
            },
            expected: new BadRequestError
        }
    ])
    UnitTestHelper('readAll', [
        {
            label:"Should success and returning array of account",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'readAll').mockResolvedValue([mockData as IAccount])
                return service.readAll()
            },
            expected: expect.arrayContaining([expect.objectContaining(mockData)])
        }
    ])
    UnitTestHelper('readById', [
        {
            label:"Should success and returning an account",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'readById').mockResolvedValue(mockData as IAccount)
                return service.readById(1)
            },
            expected: expect.objectContaining(mockData)
        },{
            label:"Should fail and returning null on unknown id",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'readById').mockResolvedValue(null)
                return service.readById(999999)
            },
            expected: new NotFoundError
        }
    ])
    UnitTestHelper('update', [
        {
            label:"Should success and returning 1",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'update').mockResolvedValue(1)
                return service.update(1, mockData)
            }, 
            expected: expect.any(Number)
        },{
            label:"Unknown id should throw NotFoundError",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'update').mockRejectedValue(new NotFoundError)
                return service.update(999999, mockData)
            }, 
            expected: new NotFoundError
        },{
            label:"Invalid request should throw BadRequestError",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'update').mockRejectedValue(new BadRequestError)
                return service.update(1, {...mockData, invalidField: "Invalid field"} as IAccount)
            }, 
            expected: new BadRequestError
        }
    ])

    UnitTestHelper('delete', [
        {
            label:"Should success and returning deleted id",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'delete').mockResolvedValue(1)
                return service.delete(1)
            },
            expected: expect.any(Number)
        },{
            label:"Fail should thorw NotFoundError",
            method: () => {
                jest.spyOn(AccountRepo.prototype, 'delete').mockRejectedValue(new NotFoundError)
                return service.delete(999999)
            },
            expected: new NotFoundError
        }
    ])
})
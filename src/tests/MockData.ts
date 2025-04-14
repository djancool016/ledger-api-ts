import { UserPayload } from "../middlewares/Utils";
import { IAccount } from "../models/IAccount"
import { ICoa } from "../models/ICoa"
import { ITransType } from "../models/ITransType";
import { randomNumber, randomString } from "./test-utils";

type MockData = {
    account: Partial<IAccount>;
    coa: Partial<ICoa>;
    transType: Partial<ITransType>;
}

export const mockUser: UserPayload = {
    id: 1,
    username: 'admin666',
    roles: ['admin'],
    permissions: ['super_access'],
    iat: Math.floor(Date.now() / 1000).toString(),
    exp: Math.floor(Date.now() / 1000).toString()
}

export const mockData = (): MockData => {
    return {
        account: {
            description: randomString(10)
        },
        coa: {
            account_id: 1,
            code: randomNumber(4),
            description: randomString(10)
        },
        transType: {
            code: randomString(4).toUpperCase(),
            description: randomString(10)
        }
    }
}

export const mockExpect: MockData = {
    account: {
        id: expect.any(Number),
        description: expect.any(String)
    },
    coa: {
        id: expect.any(Number),
        account_id: expect.any(Number),
        code: expect.any(Number),
        description: expect.any(String)
    },
    transType: {
        id: expect.any(Number),
        code: expect.any(String),
        description: expect.any(String)
    }
}
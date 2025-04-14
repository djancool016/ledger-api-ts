import { UserPayload } from "../middlewares/Utils";
import { IAccount } from "../models/IAccount"
import { ICoa } from "../models/ICoa"
import { ITransEntries } from "../models/ITransEntries";
import { ITransType } from "../models/ITransType";
import { randomBoolean, randomNumber, randomString } from "./test-utils";

type MockData = {
    account: Partial<IAccount>;
    coa: Partial<ICoa>;
    transType: Partial<ITransType>;
    transEntries: Partial<ITransEntries>;
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
        },
        transEntries: {
            transaction_type_id: randomNumber(0, 1, 10),
            coa_id: randomNumber(0, 1, 10),
            is_credit: randomBoolean()
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
    },
    transEntries: {
        id: expect.any(Number),
        transaction_type_id: expect.any(Number),
        coa_id: expect.any(Number),
        is_credit: expect.any(Boolean)
    }
}
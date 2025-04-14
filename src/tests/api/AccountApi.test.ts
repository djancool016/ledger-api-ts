import { IAccount } from '../../models/IAccount'
import { ApiTestSuite } from './ApiTestSuite'
import { randomString } from '../test-utils'
import { mockData, mockExpect, mockUser } from '../MockData'

describe('AccountApi', () => {
    const testSuite = new ApiTestSuite<IAccount>({
        mockUser,
        mockInput: () => mockData().account,
        expected: () => mockExpect.account
    }).init()

    const path = '/api/account'
    testSuite.create(path)
    testSuite.readAll(path)
    testSuite.update(path)
    testSuite.delete(path)
})

import { IAccount } from '../../models/IAccount'
import { ApiTestSuite } from './ApiTestSuite'
import { randomString } from '../test-utils'

describe('AccountApi', () => {
    const testSuite = new ApiTestSuite<IAccount>({
        mockUser: {
            id: 1,
            username: 'admin666',
            roles: ['admin'],
            permissions: ['super_access'],
            iat: Math.floor(Date.now() / 1000).toString(),
            exp: Math.floor(Date.now() / 1000).toString()
        },
        mockInput: () => {
            return {
                description: randomString(10)
            }
        },
        expected: () => {
            return {
                id: expect.any(Number),
                description: expect.any(String)
            };
        }
    }).init()

    const path = '/api/account'
    testSuite.create(path)
    testSuite.readAll(path)
    testSuite.update(path)
    testSuite.delete(path)
})

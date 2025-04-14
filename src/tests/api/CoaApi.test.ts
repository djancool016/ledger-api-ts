import { ApiTestSuite } from './ApiTestSuite'
import { randomNumber, randomString } from '../test-utils'
import { ICoa } from '../../models/ICoa'
import request from 'supertest';
import app from '../../app';

describe('AccountApi', () => {
    const testSuite = new ApiTestSuite<ICoa>({
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
                account_id: 1,
                code: randomNumber(4),
                description: randomString(10)
            }
        },
        expected: () => {
            return {
                id: expect.any(Number),
                account_id: expect.any(Number),
                code: expect.any(Number),
                description: expect.any(String)
            }
        }
    }).init()

    testSuite.addCreateTest = {
        label: 'Should fail with 400 when create using decimal number',
        method: () => request(app).post(path).send({...testSuite.mockInput(), code: 1010.25})
            .set('Authorization', 'Bearer Some-Access-Token'),
        expected: {
            status: 400,
            body: {message: expect.stringMatching(/must be an integer/i)}
        }
    }
    testSuite.addCreateTest = {
        label: 'Should fail with 400 when create using invalid format (must 4-digit format)',
        method: () => request(app).post(path).send({...testSuite.mockInput(), code: 101010})
            .set('Authorization', 'Bearer Some-Access-Token'),
        expected: {
            status: 400,
            body: {message: expect.stringMatching(/4-digit/i)}
        }
    }

    const path = '/api/coa'
    testSuite.create(path)
    testSuite.readAll(path)
    testSuite.update(path)
    testSuite.delete(path)
})

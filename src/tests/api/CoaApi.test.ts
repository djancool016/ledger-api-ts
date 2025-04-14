import { ApiTestSuite } from './ApiTestSuite'
import { randomNumber, randomString } from '../test-utils'
import { ICoa } from '../../models/ICoa'
import request from 'supertest';
import app from '../../app';
import { mockData, mockExpect, mockUser } from '../MockData';

describe('AccountApi', () => {
    const testSuite = new ApiTestSuite<ICoa>({
        mockUser,
        mockInput: () => mockData().coa,
        expected: () => mockExpect.coa
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

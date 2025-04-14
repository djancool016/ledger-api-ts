import { ApiTestSuite } from './ApiTestSuite'
import request from 'supertest';
import app from '../../app';
import { ITransType } from '../../models/ITransType';
import { mockData, mockExpect, mockUser } from '../MockData';

describe('AccountApi', () => {
    const testSuite = new ApiTestSuite<ITransType>({
        mockUser,
        mockInput: () => mockData.transType,
        expected: () => mockExpect.transType
    }).init()

    testSuite.addCreateTest = {
        label: 'Should fail with 400 when create using short code',
        method: () => request(app).post(path).send({...testSuite.mockInput(), code: "QWE"})
            .set('Authorization', 'Bearer Some-Access-Token'),
        expected: {
            status: 400,
            body: {message: expect.stringMatching(/must be 4 characters long/i)}
        }
    }
    testSuite.addCreateTest = {
        label: 'Should fail with 400 when create using long code',
        method: () => request(app).post(path).send({...testSuite.mockInput(), code: "QWERTY"})
            .set('Authorization', 'Bearer Some-Access-Token'),
        expected: {
            status: 400,
            body: {message: expect.stringMatching(/must be 4 characters long/i)}
        }
    }

    const path = '/api/type'
    testSuite.create(path)
    testSuite.readAll(path)
    testSuite.update(path)
    testSuite.delete(path)
})

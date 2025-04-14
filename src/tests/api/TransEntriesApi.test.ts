import { ApiTestSuite } from './ApiTestSuite'
import request from 'supertest';
import app from '../../app';
import { mockData, mockExpect, mockUser } from '../MockData';
import { ITransEntries } from '../../models/ITransEntries';
import { randomNumber } from '../test-utils';

describe('AccountApi', () => {
    const testSuite = new ApiTestSuite<ITransEntries>({
        mockUser,
        mockInput: () => mockData().transEntries,
        expected: () => {return {...mockExpect.transEntries, is_credit: expect.any(Number)}}
    }).init()

    testSuite.addCreateTest = {
        label: 'Should fail with 400 when create using unknown transaction_type_id',
        method: () => request(app).post(path).send({...testSuite.mockInput(), transaction_type_id: randomNumber(5)})
            .set('Authorization', 'Bearer Some-Access-Token'),
        expected: {
            status: 400,
            body: {message: expect.stringMatching(/bad request/i)}
        }
    }
    testSuite.addCreateTest = {
        label: 'Should fail with 400 when create using unknown coa_id',
        method: () => request(app).post(path).send({...testSuite.mockInput(), coa_id: randomNumber(5)})
            .set('Authorization', 'Bearer Some-Access-Token'),
        expected: {
            status: 400,
            body: {message: expect.stringMatching(/bad request/i)}
        }
    }

    const path = '/api/entries'
    testSuite.create(path)
    testSuite.readAll(path)
    testSuite.update(path)
    testSuite.delete(path)
})

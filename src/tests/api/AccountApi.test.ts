import request from 'supertest'
import db from "../../db"
import app from '../../app'
import { IAccount } from '../../models/IAccount'
import { IntegrationTestHelper } from '../IntegrationTestHelper'

describe('AccountApi', () => {
    let mockData: Partial<IAccount> = {
        id: expect.any(Number),
        description: expect.any(String)
    };

    beforeAll(async() => {
        await db.migrate.latest();
        await db.seed.run();
    })

    afterAll(async() => {
        await db.destroy()
    })
    beforeEach(() => {
        mockData = {
            description: "Testing account service"
        }
    })
    IntegrationTestHelper('POST /account', [
        {
            label: 'Should success 201 and returning data.id',
            method: () => request(app).post('/api/account').send(mockData),
            expected: {
                status: 201,
                body: expect.objectContaining({id: expect.any(Number), message: expect.stringMatching(/success/i)}),
                headers: undefined
            }
        }
    ])
    IntegrationTestHelper('GET /account', [
        {
            label: 'Should success 200 and returning all account data',
            method: () => request(app).get('/api/account'),
            expected: {
                status: 200,
                body: {data: expect.arrayContaining([expect.objectContaining(mockData)])},
                headers: undefined
            }
        }
    ])
    IntegrationTestHelper('PUT /account/:id', [
        {
            label: 'Should success 200 and update account data',
            method: async () => {
                const createRes = await request(app).post('/api/account').send(mockData);
                const id = createRes.body.id;
                return request(app).put(`/api/account/${id}`).send({
                    description: "Updated description"
                });
            },
            expected: {
                status: 200,
                body: {message: expect.stringMatching(/success/i)},
                headers: undefined
            }
        }
    ]);

    IntegrationTestHelper('DELETE /account/:id', [
        {
            label: 'Should success 200 and delete account data',
            method: async () => {
                const createRes = await request(app).post('/api/account').send(mockData);
                const id = createRes.body.id;
                return request(app).delete(`/api/account/${id}`);
            },
            expected: {
                status: 200,
                body: {message: expect.stringMatching(/success/i)},
                headers: undefined
            }
        }
    ]);
})
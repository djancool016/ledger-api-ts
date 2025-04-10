import request from 'supertest'
import db from "../../db"
import app from '../../app'
import { IAccount } from '../../models/IAccount'
import { IntegrationTestHelper } from '../IntegrationTestHelper'
import axios from 'axios'
import { UserPayload } from '../../middlewares/Utils'

describe('AccountApi', () => {
    let mockData: Partial<IAccount> = {
        id: expect.any(Number),
        description: expect.any(String)
    };
    let userPayload: UserPayload = {
        id: 1,
        username: 'admin666',
        roles: ['admin'],
        permissions: ['super_access'],
        iat: Math.floor(Date.now() / 1000).toString(),
        exp: Math.floor(Date.now() / 1000).toString()
    }

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
            setup: () => { jest.spyOn(axios, 'post').mockResolvedValueOnce({ 
                status: 200,
                data: userPayload
            })},
            method: () => request(app).post('/api/account').send(mockData)
                .set('Authorization', 'Bearer Some-Access-Token'),
            expected: {
                status: 201,
                body: expect.objectContaining({id: expect.any(Number), message: expect.stringMatching(/success/i)}),
                headers: undefined
            }
        },{
            label: 'Should fail 403 on unauthorized user',
            setup: () => { jest.spyOn(axios, 'post').mockResolvedValueOnce({
                status: 403,
                message: 'Forbidden'
            })},
            method: () => request(app).post('/api/account').send(mockData)
                .set('Authorization', 'Bearer Some-Access-Token'),
            expected: {
                status: 403,
                body: { message: expect.stringMatching(/Forbidden/i) },
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
            setup: () => { jest.spyOn(axios, 'post').mockResolvedValue({ 
                status: 200,
                data: userPayload
            })},
            method: async () => {
                const createRes = await request(app).post('/api/account').send(mockData)
                    .set('Authorization', 'Bearer Some-Access-Token')
                const id = createRes.body.id;
                return request(app).put(`/api/account/${id}`).send({description: "Updated description"})
                    .set('Authorization', 'Bearer Some-Access-Token')
            },
            expected: {
                status: 200,
                body: {message: expect.stringMatching(/success/i)},
                headers: undefined
            }
        },{
            label: 'Should fail 403 on unauthorized user',
            setup: () => { jest.spyOn(axios, 'post').mockResolvedValue({
                status: 403,
                message: 'Forbidden'
            })},
            method: async () => {
                const createRes = await request(app).post('/api/account').send(mockData)
                    .set('Authorization', 'Bearer Some-Access-Token')
                const id = createRes.body.id;
                return request(app).put(`/api/account/${id}`).send({description: "Updated description"})
                    .set('Authorization', 'Bearer Some-Access-Token')
            },
            expected: {
                status: 403,
                body: { message: expect.stringMatching(/Forbidden/i) },
                headers: undefined
            }
        }
    ]);

    IntegrationTestHelper('DELETE /account/:id', [
        {
            label: 'Should success 200 and delete account data',
            setup: () => { jest.spyOn(axios, 'post').mockResolvedValue({ 
                status: 200,
                data: userPayload
            })},
            method: async () => {
                const createRes = await request(app).post('/api/account').send(mockData)
                    .set('Authorization', 'Bearer Some-Access-Token')
                const id = createRes.body.id;
                return request(app).delete(`/api/account/${id}`)
                    .set('Authorization', 'Bearer Some-Access-Token');
            },
            expected: {
                status: 200,
                body: {message: expect.stringMatching(/success/i)},
                headers: undefined
            }
        },{
            label: 'Should fail 403 on unauthorized user',
            setup: () => { jest.spyOn(axios, 'post').mockResolvedValue({
                status: 403,
                message: 'Forbidden'
            })},
            method: async () => {
                const createRes = await request(app).post('/api/account').send(mockData)
                    .set('Authorization', 'Bearer Some-Access-Token')
                const id = createRes.body.id;
                return request(app).delete(`/api/account/${id}`)
                    .set('Authorization', 'Bearer Some-Access-Token');
            },
            expected: {
                status: 403,
                body: { message: expect.stringMatching(/Forbidden/i) },
                headers: undefined
            }
        }
    ]);
})
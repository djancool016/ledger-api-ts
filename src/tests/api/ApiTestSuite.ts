import axios from "axios";
import db from "../../db";
import request from 'supertest';
import { UserPayload } from "../../middlewares/Utils";
import { IntegrationTestCase, IntegrationTestHelper } from "../IntegrationTestHelper";
import app from "../../app";
import { randomNumber } from "../test-utils";

interface IApiTestSuite<T> {
    create(path: string): void;
    readAll(path: string): void;
    readByParamsId(path: string): void;
    readByQueries(path: string, queries: string[]): void;
    update(path: string): void;
    delete(path: string): void;
}

export type ApiTestSuiteOpt<T> = {
    mockUser: UserPayload;
    mockInput: () => Partial<T>;
    expected: () => Partial<T>
}

export class ApiTestSuite<T> implements IApiTestSuite<T>{
    public mockUser: UserPayload;
    public mockInput: () => Partial<T>;
    public expected: () => Partial<T> 
    public otherTest: { [key: string]: IntegrationTestCase[] }

    constructor(opt: ApiTestSuiteOpt<T>){
        this.mockUser = opt.mockUser;
        this.mockInput = opt.mockInput;
        this.expected = opt.expected;
        this.otherTest = {
            create: [], update: []
        };
    }
    init(): ApiTestSuite<T>{
        beforeAll(async () => {
            await db.migrate.latest();
            await db.seed.run();
        })
        afterAll(async () => {
            await db.destroy()
        })
        beforeEach(() => {
            jest.clearAllMocks()
            jest.spyOn(axios, 'post').mockResolvedValue({ 
                status: 200,
                data: this.mockUser
            })
        })
        return this
    }
    set addCreateTest(test: IntegrationTestCase){
        this.otherTest.create.push(test)
    }
    set addUpdateTest(test: IntegrationTestCase){
        this.otherTest.update.push(test)
    }
    create(path: string) {
        const testCases: IntegrationTestCase[] = [
            {
                label: 'Should success 201 and returning data.id',
                method: () => request(app).post(path).send(this.mockInput())
                    .set('Authorization', 'Bearer Some-Access-Token'),
                expected: {
                    status: 201,
                    body: expect.objectContaining({id: expect.any(Number), message: expect.stringMatching(/success/i)})
                }
            },{
                label: 'Should fail 403 on unauthorized user',
                setup: () => { jest.spyOn(axios, 'post').mockResolvedValue({
                    status: 403,
                    message: 'Forbidden'
                })},
                method: () => request(app).post(path).send(this.mockInput())
                    .set('Authorization', 'Bearer Some-Access-Token'),
                expected: {
                    status: 403,
                    body: { message: expect.stringMatching(/Forbidden/i) }
                }
            }, ...this.otherTest.create
        ]
        return IntegrationTestHelper(`POST ${path}`, testCases);
    }

    readAll(path: string) {
        const testCases: IntegrationTestCase[] = [
            {
                label: 'Should success 200 and returning an array of object',
                method: () => request(app).get(path)
                    .set('Authorization', 'Bearer Some-Access-Token'),
                expected: {
                    status: 200,
                    body: {data: expect.arrayContaining([expect.objectContaining(this.expected())])}
                }
            },{
                label: 'Should fail 403 on unauthorized user',
                setup: () => { jest.spyOn(axios, 'post').mockResolvedValue({
                    status: 403,
                    message: 'Forbidden'
                })},
                method: () => request(app).get(path)
                    .set('Authorization', 'Bearer Some-Access-Token'),
                expected: {
                    status: 403,
                    body: { message: expect.stringMatching(/Forbidden/i) }
                }
            }
        ]
        return IntegrationTestHelper(`GET ${path}`, testCases);
    }
    readByParamsId(path: string) {
        return IntegrationTestHelper(`GET ${path}`, [
            {
                label: 'Should success 200 and returning an object',
                method: async () => {
                    const createRes = await request(app).post(path).send(this.mockInput())
                        .set('Authorization', 'Bearer Some-Access-Token')
                    const id = createRes.body.id;
                    return request(app).get(`${path}/${id}`)
                },
                expected: {
                    status: 200,
                    body: {data: expect.arrayContaining([expect.objectContaining(this.expected())])}
                }
            },{
                label: 'Should fail 403 on unauthorized user',
                setup: () => { jest.spyOn(axios, 'post').mockResolvedValue({
                    status: 403,
                    message: 'Forbidden'
                })},
                method: () => request(app).get(`${path}/${randomNumber(10)}`)
                    .set('Authorization', 'Bearer Some-Access-Token'),
                expected: {
                    status: 403,
                    body: { message: expect.stringMatching(/Forbidden/i) }
                }
            },{
                label: 'Should fail with status 404',
                method: () => request(app).get(`${path}/${randomNumber(10)}`),
                expected: {
                    status: 404,
                    body: {message: expect.stringMatching(/not found/i)}
                }
            }
        ]);
    }
    readByQueries(path: string, queries: string[]){
        throw new Error('This test cases is not implemented yet')
    }
    update(path: string) {
        return IntegrationTestHelper(`PUT ${path}`, [
            {
                label: 'Should success 200 and update account data',
                method: async () => {
                    const createRes = await request(app).post(path).send(this.mockInput())
                        .set('Authorization', 'Bearer Some-Access-Token')
                    const id = createRes.body.id;
                    return request(app).put(`${path}/${id}`).send(this.mockInput())
                        .set('Authorization', 'Bearer Some-Access-Token')
                },
                expected: {
                    status: 200,
                    body: {message: expect.stringMatching(/success/i)}
                }
            },{
                label: 'Should fail 403 on unauthorized user',
                setup: () => { jest.spyOn(axios, 'post').mockResolvedValue({
                    status: 403,
                    message: 'Forbidden'
                })},
                method: async () => {
                    return request(app).put(`${path}/${randomNumber(10)}`).send(this.mockInput())
                        .set('Authorization', 'Bearer Some-Access-Token')
                },
                expected: {
                    status: 403,
                    body: { message: expect.stringMatching(/Forbidden/i) }
                }
            },{
                label: 'Should fail 404 on not exist data being updated',
                method: async () => {
                    return request(app).put(`${path}/${randomNumber(10)}`).send(this.mockInput())
                        .set('Authorization', 'Bearer Some-Access-Token')
                },
                expected: {
                    status: 404,
                    body: { message: expect.stringMatching(/Not Found/i) }
                }
            }, ...this.otherTest.update
        ]);
    }
    delete(path: string) {
        return IntegrationTestHelper(`DELETE ${path}`, [
            {
                label: 'Should success 200 and delete account data',
                method: async () => {
                    const createRes = await request(app).post(path).send(this.mockInput())
                        .set('Authorization', 'Bearer Some-Access-Token')
                    const id = createRes.body.id;
                    return request(app).delete(`${path}/${id}`)
                        .set('Authorization', 'Bearer Some-Access-Token')
                },
                expected: {
                    status: 200,
                    body: {message: expect.stringMatching(/success/i)}
                }
            },{
                label: 'Should fail 403 on unauthorized user',
                setup: () => { jest.spyOn(axios, 'post').mockResolvedValue({
                    status: 403,
                    message: 'Forbidden'
                })},
                method: async () => {
                    return request(app).delete(`${path}/${randomNumber(10)}`)
                        .set('Authorization', 'Bearer Some-Access-Token')
                },
                expected: {
                    status: 403,
                    body: { message: expect.stringMatching(/Forbidden/i) }
                }
            },{
                label: 'Should fail 404 on not exist data being deleted',
                method: async () => {
                    return request(app).delete(`${path}/${randomNumber(10)}`)
                        .set('Authorization', 'Bearer Some-Access-Token')
                },
                expected: {
                    status: 404,
                    body: { message: expect.stringMatching(/Not Found/i) }
                }
            }
        ]);
    }
}
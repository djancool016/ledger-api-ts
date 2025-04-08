import request from 'supertest'
import { TestHelper } from "../TestHelper"
import db from "../../db"
import app from '../../app'

describe('AccountApi', () => {

    beforeAll(async() => {
        await db.migrate.latest();
        await db.seed.run();
    })

    afterAll(async() => {
        await db.destroy()
    })

    TestHelper({
        describeText: 'POST /account',
        success: [{
            label: "Should create an account and return ID",
            method: () => request(app)
                .post('/api/account')
                .send({ description: "Test Account" }),
            status: 201,
            output: () => ({ id: expect.any(Number), message: expect.stringContaining('success') }) // supertest puts this in `res.body`
        }],
        error: [{
            label: "Should fail with 400 on missing description",
            method: () => request(app)
                .post('/api/account')
                .send({}),
            status: 400,
            output: () => ({message: expect.stringContaining('is required')})
        }]
    });
})
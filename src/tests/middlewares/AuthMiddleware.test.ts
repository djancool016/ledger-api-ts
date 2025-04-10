import { MiddlewareTestHelper } from "../MiddlewareTestHelper";
import { auth } from "../../middlewares/AuthMiddlewar";
import axios from "axios";
import { UserPayload } from "../../middlewares/Utils";
import { AuthorizationError } from "../../utils/CustomError";

const userPayload: UserPayload = {
    id: 1,
    username: 'TestUser',
    roles: ['Test roles'],
    permissions: ['Test permisions'],
    iat: Math.floor(Date.now() / 1000).toString(),
    exp: Math.floor(Date.now() / 1000).toString()
}

MiddlewareTestHelper('Auth Middleware', [
    {
        label: "Validate token from header should returning user payload",
        setup: () => {
            jest.spyOn(axios, 'post').mockResolvedValueOnce({ 
                status: 200,
                data: userPayload
            });
        },
        middleware: auth(['Test roles'], ['Test permissions']),
        req: {
            headers: {authorization: `Bearer Some-Access-Token`}
        },
        expected: {
            nextCalled: true,
            customCheck: (req) => {
                expect(req.userPayload).toEqual({
                    ...userPayload, iat: expect.any(String), exp: expect.any(String)
                });
            }
        }
    },{
        label: "Should throw AuthorizedError on user with unauthorized role and no valid perission",
        setup: () => {
            jest.spyOn(axios, 'post').mockResolvedValueOnce({ 
                status: 403,
                data: {
                    message: 'Forbidden'
                }
            });
        },
        middleware: auth(['unknown_role'], []),
        req: {
            headers: {authorization: `Bearer Some-Access-Token`}
        },
        expected: {
            nextError: new AuthorizationError
        }
    }
])

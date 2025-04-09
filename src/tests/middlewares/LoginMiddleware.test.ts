import { MiddlewareTestHelper } from "../MiddlewareTestHelper"
import { loginMiddleware, LoginRequest } from "../../middlewares/LoginMiddleware"
import axios from "axios";

MiddlewareTestHelper<LoginRequest>('LoginMiddleware', [
    {
        label: "Should store tokens in req and call next() on success",
        middleware: loginMiddleware,
        setup: () => {
            jest.spyOn(axios, 'post').mockResolvedValueOnce({ 
                data: { accessToken: 'abc', refreshToken: 'xyz' }
            });
        },
        req: {
            body: { username: 'test', password: 'test' }
        },
        expected: {
            nextCalled: true,
            customCheck: (req) => {
                expect(req.tokens).toEqual({
                    accessToken: 'abc',
                    refreshToken: 'xyz'
                });
            }
        }
    }
]);

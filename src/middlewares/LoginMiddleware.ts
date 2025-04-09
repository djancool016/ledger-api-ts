import axios from "axios";
import { NextFunction, Request, Response } from "express";

export interface LoginRequest extends Request {
    tokens: {accessToken: string, refreshToken: string};
}

export const loginMiddleware = async (req: LoginRequest, res: Response, next: NextFunction) => {
    try {
        const response = await axios.post(`http://localhost:5100/api/login`, {
            username: req.body.username, password: req.body.password
        })
        req.tokens = {accessToken: response.data.accessToken, refreshToken: response.data.refreshToken}
        next()
    } catch (error) {
        next(error)
    }
}
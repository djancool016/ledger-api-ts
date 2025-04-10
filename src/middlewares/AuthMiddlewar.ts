import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { getToken, getUrlFromEnv, handleAxiosErrorResponse, UserPayload, verifyUserRolesPermissions } from "./Utils";

export const auth = (allowedRoles: string[], allowedPermissions: string []) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = getToken(req)
            const response = await axios.post(`${getUrlFromEnv('AUTH_API_URL')}/auth`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            handleAxiosErrorResponse(response)
            verifyUserRolesPermissions(allowedRoles, allowedPermissions, response.data)
            req.userPayload = response.data
            next()
        } catch (error) {
            next(error)
        }
    }
    
} 

declare namespace Express {
    export interface Request {
        allowedRoles: string[],
        allowedPermissions: string[],
        userPayload?: import('../middlewares/Utils').UserPayload,
        accessToken?: string,
        refreshToken?: string
    }
}
declare namespace Express {
    export interface Request {
        allowedRoles: string[],
        allowedPermissions: string[]
    }
}
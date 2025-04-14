import { Request } from "express";
import { AppError, AuthorizationError, BadRequestError, NotFoundError } from "../utils/CustomError";
import { AxiosResponse } from "axios";

export type UserPayload = {
    id: number;
    username: string;
    roles: string[];
    permissions: string[];
    iat: string;
    exp: string
}


export function getToken(req: Request): string {
    const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            throw new AuthorizationError('No token or invalid header format');
        }
        const token = authorizationHeader.split(' ')[1];
        if(!token) throw new AuthorizationError('Token not found');
        return token
}

export const getUrlFromEnv = (env: string): string => {
    const url = process.env[env];
    if(!url) throw new AppError('Api environment variable is not set properly.')
    return url
}

export function verifyUserRolesPermissions(allowedRoles: string[], allowedPermissions: string [], payload: UserPayload): boolean {
    // Convert all roles and permissions to lowercase for case-insensitive comparison
    allowedRoles = allowedRoles.map(role => role.toLowerCase());
    allowedPermissions = allowedPermissions.map(permission => permission.toLowerCase());
    payload.roles = payload.roles.map(role => role.toLowerCase());
    payload.permissions = payload.permissions.map(permission => permission.toLowerCase());

    // Check if roles exist and match
    const hasRole = allowedRoles?.length > 0 && 
        payload.roles.some(role => allowedRoles.includes(role));

    // Check if permissions exist and match
    const hasPermission = allowedPermissions?.length > 0 && 
    (payload.permissions.some(permission => allowedPermissions.includes(permission)) ||
    (allowedPermissions[0] === 'any_roles' && payload.roles.length > 0));

    // Access is granted if either roles or permissions match
    if (hasRole || hasPermission) return true;

    throw new AuthorizationError();
}

export function handleAxiosErrorResponse(response: AxiosResponse): void {
    const { status, statusText } = response;

    if (status < 299) return;

    switch (status) {
        case 400:
            throw new BadRequestError();
        case 401:
        case 403:
            throw new AuthorizationError();
        case 404:
            throw new NotFoundError();
        default:
            console.error(`Error: ${status} - ${statusText}`)
            throw new AppError();
    }
}

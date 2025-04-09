import { Request, Response } from "express";

export function createMockRequest<T extends Request>(overrides: Partial<T> = {}): T {
    return {
        headers: {},
        body: {},
        params: {},
        query: {},
        ...overrides,
    } as T;
}
export function createMockResponse(overrides: Partial<Response> = {}): any {
    const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        ...overrides,
    };
    return res;
}

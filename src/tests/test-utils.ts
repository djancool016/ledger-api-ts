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

export function randomNumber(length: number): number{
    return Math.floor(Math.random() * (10**length - 10**(length-1))) + 10**(length-1)
}

export function randomString(length: number): string{
    return Array.from({length: length}, () => Math.floor(Math.random() * 36).toString(36)).join('')
}

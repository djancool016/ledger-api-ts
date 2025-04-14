import { Response } from 'supertest';

export type IntegrationTestCase = {
    label: string;
    method: () => Promise<Response>; 
    expected: {
        status: number;
        body?: unknown | ((body: any) => void);
        headers?: Record<string, string>;
    };
    setup?: () => void;
};

export function IntegrationTestHelper(
    describeText: string,
    cases: IntegrationTestCase[],
) {
    describe(describeText, () => {
        cases.forEach(({ label, method, expected, setup }) => {
            it(label, async () => {
                if(setup) setup()
                let response: Response;
                try {
                    response = await method(); 
                } catch (error) {
                    expect(error).toBeTruthy();
                    if(error instanceof Error) console.error(error.message)
                    return;
                }
                
                if (expected.body !== undefined) {
                    if (typeof expected.body === 'function') {
                        expected.body(response.body); // custom assertion
                    } else {
                        expect(response.body).toEqual(expected.body);
                    }
                }

                if (expected.headers) {
                    for (const [key, value] of Object.entries(expected.headers)) {
                        expect(response.headers[key.toLowerCase()]).toBe(value);
                    }
                }

                expect(response.status).toBe(expected.status);
            });
        });
    });
}

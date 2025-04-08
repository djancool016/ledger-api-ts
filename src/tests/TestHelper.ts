type TestCases = {
    describeText: string;
    success: {
        label?: string;
        method: () => Promise<any>;
        output?: () => any;
        status?: number; // for HTTP response
    }[];
    error?: {
        label?: string;
        method: () => Promise<any>;
        output?: () => any;
        status?: number; // for HTTP error response
    }[];
}


export function TestHelper({ describeText, success, error }: TestCases) {
    describe(describeText, () => {
        success.forEach(({ label, method, output, status }) => {
            const safeMethod = toPromise(method);

            it(label ?? `Success test`, async () => {
                const result = await safeMethod();

                // For integration-style checks
                if (status !== undefined && result?.status !== undefined) {
                    expect(result.status).toBe(status);
                }

                if (output) {
                    const expected = output();
                    const actual = result?.body ?? result; // support both HTTP and regular result
                    expect(actual).toEqual(expected);
                } else {
                    expect(result).toBeTruthy();
                }
            });
        });

        error?.forEach(({ label, method, output, status }) => {
            const safeMethod = toPromise(method);
            const expectedOutput = output ? output() : undefined;

            it(label ?? `Error test`, async () => {
                try {
                    const result = await safeMethod();

                    if (status !== undefined && result?.status !== undefined) {
                        expect(result.status).toBe(status);
                    }

                    if (expectedOutput instanceof Error) {
                        throw new Error("Expected error to be thrown, but got result");
                    } else if (expectedOutput === null) {
                        expect(result).toBeNull();
                    } else {
                        expect(result).toEqual(expectedOutput);
                    }
                } catch (err) {
                    if (expectedOutput instanceof Error) {
                        expect(err).toBeInstanceOf(expectedOutput.constructor);
                    } else {
                        throw err;
                    }
                }
            });
        });
    });
}

function isPromise<T>(obj: any): obj is Promise<T> {
    return !!obj && typeof obj.then === 'function';
}

function toPromise(fn: () => any): () => Promise<any> {
    return () => {
        try {
            const result = fn();
            return isPromise(result) ? result : Promise.resolve(result);
        } catch (err) {
            return Promise.reject(err);
        }
    };
}

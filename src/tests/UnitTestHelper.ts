type UnitTestCase = {
    label?: string;
    method: () => any | Promise<any>;
    expected: any | Error | { matcher: (result: any) => void };
    setup?: () => void;
};


export function UnitTestHelper(describeText: string, cases: UnitTestCase[]): void {
    describe(describeText, () => {
        cases.forEach(({ label, method, expected, setup }) => {
            it(label ?? 'should behave as expected', async () => {
                try {
                    if (setup) setup();
                    const safeMethod = toPromise(() => method());

                    if (expected instanceof Error) {
                        await expect(safeMethod()).rejects.toThrow(expected);
                    } else {
                        const result = await safeMethod();
                        if (typeof expected === 'function') {
                            expected(result);
                        } else {
                            expect(result).toEqual(expected); // exact match
                        }
                    }
                } catch (err) {
                    console.error(`Error in test case "${label}":`, err);
                    throw err; // rethrow to let Jest fail the test properly
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


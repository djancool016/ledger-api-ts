import { z } from "zod";
import { ValidatorOptions } from "../middlewares/InputValidator";

const validator = {
    transaction_type_id: z.number({required_error: "Transaction id is required"})
        .int({message: "Transaction id must be integer"})
        .positive({message: "Transaction id must be positive number"}),
    coa_id: z.number({required_error: "Coa id is required"})
        .int({message: "Coa id must be integer"})
        .positive({message: "Coa id must be positive number"}),  
    is_credit: z.union([z.boolean(), z.literal(0), z.literal(1)], {required_error: "Is credit is required"})
        .transform(val => Boolean(val))
}

export const transEntriesValidator: Record<string, ValidatorOptions> = {
    create: {
        body: z.object(validator).strip()
    },
    update: {
        body: z.object(validator).strip()
    }
}
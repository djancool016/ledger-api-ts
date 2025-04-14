import { z } from "zod"
import { ValidatorOptions } from "../middlewares/InputValidator"

const {account_id, code, description} = {
    account_id: z.number({ message: 'Account id is required'}),
    code: z.number({ required_error: "Code is required" })
        .int({ message: "Code must be an integer" })
        .refine(code => code >= 1000 && code <= 9999, {message: "Code must be a 4-digit number"}),
    description: z.string({ message: "Description is required" })
        .min(4, { message: "Description must be at least 4 characters long" })
}
export const coaValidator: Record<string, ValidatorOptions> = {
    create: {
        body: z.object({account_id, code, description}).strip()
    },
    update: {
        body: z.object({account_id, code, description}).strip()
    }
}
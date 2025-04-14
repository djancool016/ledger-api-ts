import { z } from "zod";
import { ValidatorOptions } from "../middlewares/InputValidator";

const validator = {
    code: z.string({required_error: "Code is required"})
        .length(4, { message: "Code must be 4 characters long" })
        .transform((val) => val.toUpperCase()),
    description: z.string({required_error: 'Description is required'})
        .min(6, { message: "Description to short" })      
}

export const transTypeValidator: Record<string, ValidatorOptions> = {
    create: {
        body: z.object(validator).strip()
    },
    update: {
        body: z.object(validator).strip()
    }
}
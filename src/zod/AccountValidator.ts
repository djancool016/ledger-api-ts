import { z } from "zod"
import { ValidatorOptions } from "../middlewares/InputValidator"

const {description} = {
    description: z.string({ message: "Description is required" })
        .min(4, { message: "Description must be at least 4 characters long" })
}
export const accountValidator: Record<string, ValidatorOptions> = {
    create: {
        body: z.object({description}).strip()
    },
    update: {
        body: z.object({description}).strip()
    }
}
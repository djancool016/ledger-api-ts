import { Router } from "express";
import { container } from "../inversify.config";
import { validate } from "../middlewares/InputValidator";
import { auth } from "../middlewares/AuthMiddlewar";
import { ICrudRequest } from "../types/ICrudRequest";
import { ITransEntries } from "../models/ITransEntries";
import { transEntriesValidator } from "../zod/TransEntriesValidator";

const router = Router()
const controller = container.get<ICrudRequest<ITransEntries>>("TransEntriesController")
const validator = transEntriesValidator

router.post('/', auth(['admin'], []), validate(validator.create), controller.create.bind(controller))
router.get('/', auth([], ['any_roles']), controller.readAll.bind(controller))
router.put('/:id', auth(['admin'], []), validate(validator.update), controller.update.bind(controller))
router.delete('/:id', auth(['admin'], []), controller.delete.bind(controller))

module.exports = router
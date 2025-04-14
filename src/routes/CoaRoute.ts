import { Router } from "express";
import { container } from "../inversify.config";
import { ICrudRequest } from "../types/ICrudRequest";
import { ICoa } from "../models/ICoa";
import { auth } from "../middlewares/AuthMiddlewar";
import { validate } from "../middlewares/InputValidator";
import { coaValidator } from "../zod/CoaValidator";

const router = Router()
const controller = container.get<ICrudRequest<ICoa>>("CoaController")

router.post('/', auth(['admin'], []), validate(coaValidator.create), controller.create.bind(controller))
router.get('/', auth([], ['any_roles']), controller.readAll.bind(controller))
router.put('/:id', auth(['admin'], []), validate(coaValidator.update), controller.update.bind(controller))
router.delete('/:id', auth(['admin'], []), controller.delete.bind(controller))

module.exports = router
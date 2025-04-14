import { Router } from "express";
import { container } from "../inversify.config";
import { validate } from "../middlewares/InputValidator";
import { accountValidator } from "../zod/AccountValidator";
import { auth } from "../middlewares/AuthMiddlewar";
import { ICrudRequest } from "../types/ICrudRequest";
import { IAccount } from "../models/IAccount";

const router = Router()
const controller = container.get<ICrudRequest<IAccount>>("AccountController")

router.post('/', auth(['admin'], []), validate(accountValidator.create), controller.create.bind(controller))
router.get('/', auth([], ['any_roles']), controller.readAll.bind(controller))
router.put('/:id', auth(['admin'], []), validate(accountValidator.update), controller.update.bind(controller))
router.delete('/:id', auth(['admin'], []), controller.delete.bind(controller))

module.exports = router
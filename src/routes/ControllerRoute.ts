import { Router } from "express";
import { container } from "../inversify.config";
import { IAccountController } from "../controllers/IAccountController";
import { validate } from "../middlewares/InputValidator";
import { accountValidator } from "../zod/AccountValidator";
import { auth } from "../middlewares/AuthMiddlewar";

const router = Router()
const controller = container.get<IAccountController>("IAccountController")

router.post('/', auth(['admin'], []), validate(accountValidator.create), controller.create.bind(controller))
router.get('/', controller.readAll.bind(controller))
router.put('/:id', auth(['admin'], []), validate(accountValidator.update), controller.update.bind(controller))
router.delete('/:id', auth(['admin'], []), controller.delete.bind(controller))

module.exports = router
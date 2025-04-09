import { Router } from "express";
import { container } from "../inversify.config";
import { IAccountController } from "../controllers/IAccountController";
import { validate } from "../middlewares/InputValidator";
import { accountValidator } from "../zod/AccountValidator";

const router = Router()
const controller = container.get<IAccountController>("IAccountController")

router.post('/', validate(accountValidator.create), controller.create.bind(controller))
router.get('/', controller.readAll.bind(controller))
router.put('/:id',  validate(accountValidator.update), controller.update.bind(controller))
router.delete('/:id', controller.delete.bind(controller))

module.exports = router
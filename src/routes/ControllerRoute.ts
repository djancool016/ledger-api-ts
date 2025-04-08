import { Router } from "express";
import { container } from "../inversify.config";
import { IAccountController } from "../controllers/IAccountController";

const router = Router()
const controller = container.get<IAccountController>("IAccountController")

router.post('/', controller.create.bind(controller))
router.get('/', controller.readAll.bind(controller))
router.put('/', controller.update.bind(controller))
router.delete('/', controller.delete.bind(controller))

module.exports = router
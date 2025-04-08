import { Router } from "express";
const router = Router()

router.use('/account', require('./ControllerRoute'))

module.exports = router
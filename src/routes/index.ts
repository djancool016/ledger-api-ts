import { Router } from "express";
const router = Router()

router.use('/account', require('./AccountRoute'))
router.use('/coa', require('./CoaRoute'))

module.exports = router
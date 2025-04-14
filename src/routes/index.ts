import { Router } from "express";
const router = Router()

router.use('/account', require('./AccountRoute'))
router.use('/coa', require('./CoaRoute'))
router.use('/type', require('./TransTypeRoute'))

module.exports = router
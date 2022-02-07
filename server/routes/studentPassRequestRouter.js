const router = require('express').Router()
const studentPassRequestCtrl = require('../controllers/studentPassRequestCtrl')
const auth = require('../middleware/auth')


router.post('/gatepass', studentPassRequestCtrl.gatePass)
router.post('/eventpass', studentPassRequestCtrl.eventPass)
router.post('/sickpass', studentPassRequestCtrl.sickPass)
router.post('/otherpass', studentPassRequestCtrl.otherPass)
router.post('/leave', studentPassRequestCtrl.leave)

module.exports = router
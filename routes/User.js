const express = require('express')
const userCtrl = require('../controllers/User')
const router = express.Router()

router.post('/signup', userCtrl.signUp)
router.post('/login', userCtrl.logIn)

module.exports = router;
const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

// register
router.post('/register', userController.registerController )
router.post('/login',userController.loginController)
router.post('/google-login',userController.googleLoginController)

module.exports = router
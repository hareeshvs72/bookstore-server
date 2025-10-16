const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()
const bookController = require('../controllers/booksController')
const jwtMiddleware = require('../jwtMiddleware/jwtMiddleware')
// register
router.post('/register', userController.registerController )

router.post('/login',userController.loginController)

router.post('/google-login',userController.googleLoginController)

router.post('/add-book',jwtMiddleware, bookController.addBookController)


module.exports = router
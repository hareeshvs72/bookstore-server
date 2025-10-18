const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()
const bookController = require('../controllers/booksController')
const jwtMiddleware = require('../jwtMiddleware/jwtMiddleware')
const multerConfig = require('../jwtMiddleware/imageMulterMiddleware')
// register
router.post('/register', userController.registerController )

router.post('/login',userController.loginController)

router.post('/google-login',userController.googleLoginController)

router.post('/add-book',jwtMiddleware,multerConfig.array('uploadImg',3), bookController.addBookController)

// display book to home

router.get('/home-books',bookController.getHomeBooks)

module.exports = router
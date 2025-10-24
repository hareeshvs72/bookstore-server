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

//  get all books in books component page

router.get('/all-books',jwtMiddleware,bookController.getAllBooks)

// view book 
router.get('/books/:id/view',jwtMiddleware,bookController.viewBookController)

// get user upload books
      router.get('/user-book',jwtMiddleware,bookController.userBooksUpload)
// get user bought
 router.get('/user-bought-book',jwtMiddleware,bookController.getAllUserBoughtBooks)
//  delete user book
 
router.delete('/user-book/:id/remove',jwtMiddleware,bookController.deleteUserBook)

// get user

module.exports = router
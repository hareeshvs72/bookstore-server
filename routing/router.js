const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()
const bookController = require('../controllers/booksController')
const jwtMiddleware = require('../jwtMiddleware/jwtMiddleware')
const multerConfig = require('../jwtMiddleware/imageMulterMiddleware')
const adminJwtMiddleware = require('../jwtMiddleware/adminJwtMiddleware')
const jobController = require('../controllers/jobController')
// register
router.post('/register', userController.registerController)

router.post('/login', userController.loginController)

router.post('/google-login', userController.googleLoginController)

router.post('/add-book', jwtMiddleware, multerConfig.array('uploadImg', 3), bookController.addBookController)

// display book to home

router.get('/home-books', bookController.getHomeBooks)

// autherised user 


//  get all books in books component page

router.get('/all-books', jwtMiddleware, bookController.getAllBooks)

// view book 
router.get('/books/:id/view', jwtMiddleware, bookController.viewBookController)

// get user upload books
router.get('/user-book', jwtMiddleware, bookController.userBooksUpload)
// get user bought
router.get('/user-bought-book', jwtMiddleware, bookController.getAllUserBoughtBooks)
//  delete user book

router.delete('/user-book/:id/remove', jwtMiddleware, bookController.deleteUserBook)

// user profile update

router.put('/user-profile/edit', jwtMiddleware, multerConfig.single("profile"), userController.userProfileWditController)

//---------------------- autherised user - admin ---------------------------

// get all user
router.get('/all-user', adminJwtMiddleware, userController.getAllUsersController)

// get all user books

router.get('/admin-all-books', adminJwtMiddleware, bookController.getAllBookAdminController)

// update status of book by  admin

router.put('/admin/book/approve', adminJwtMiddleware, bookController.updateBookStatusController)

// update admin profile 

router.put('/admin-profile-edit', adminJwtMiddleware, multerConfig.single("profile"), userController.adminProfileUpdateController)


// ------------------------jobs ------------

// create job 
router.post('/add-job', adminJwtMiddleware, jobController.addJobController)

// get job 
router.get('/get-Jobs',jobController.getAllJobsController)

// delete job by id - intern shala

router.delete('/delete/:id/job',adminJwtMiddleware,jobController.deleteJobsController)

module.exports = router
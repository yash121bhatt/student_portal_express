const express = require('express')
const FrontController = require('../controllers/FrontController')
const CourseController = require('../controllers/CourseController')
const checkAuth = require('../middleware/auth')
const AdminController = require('../controllers/Admin/AdminController')
const router = express.Router()


// router.get('/',(req, res) => {
//   res.send('Hello home')
// })

// Routing
router.get('/', FrontController.login)
router.get('/dashboard',checkAuth, FrontController.home)
router.get('/about',checkAuth, FrontController.about)
router.get('/team',checkAuth, FrontController.team)
router.get('/contact',checkAuth, FrontController.contact)
router.get('/register', FrontController.register)

// Profile Update
 router.post('/profile_insert',checkAuth, FrontController.profileInsert)

//  show Profile
router.get('/profile',checkAuth, FrontController.profile)


//user insert
router.post('/user_insert', FrontController.userInsert)
// login
router.post('/varify_login', FrontController.varifyLogin)
// LogOUT
router.get('/logout', FrontController.logOut)
// Change Passworld
 router.post('/change_password',checkAuth, FrontController.changePassword)


//  Course Controller
router.post('/course_insert',checkAuth, CourseController.courseInsert)
router.get('/courseDisplay',checkAuth, CourseController.courseDisplay)
router.get('/courseView/:id',checkAuth, CourseController.courseView)
router.get('/courseEdit/:id',checkAuth, CourseController.courseEdit)
router.post('/course_update/:id',checkAuth, CourseController.courseUpdate)
router.get('/courseDelete/:id', CourseController.courseDelete)


// AdminRoute
router.get('/admin/getAllData',checkAuth, AdminController.GetAllData)

// update Status
router.post('/update_approve/:id',checkAuth, AdminController.UpdateStatus)

// router.get('**', FrontController.pageNotFound)

// app.listen(3000)


module.exports = router

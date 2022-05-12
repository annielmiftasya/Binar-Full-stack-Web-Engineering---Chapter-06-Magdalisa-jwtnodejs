var express = require('express');
var router = express.Router();
const AuthController = require('../controller/auth')
const authSuperadmin= require("../middleware/superadmin")
const auth =  require("../middleware/auth")


//registrasi member
router.post('/registerMember',AuthController.createMember);


//registrasi superadmin
router.post('/registerAdmin', authSuperadmin,AuthController.createAdmin);


//get Current data
router.get('/detailUser', auth,AuthController.currentUser);


router.post('/login',AuthController.login);

module.exports = router;

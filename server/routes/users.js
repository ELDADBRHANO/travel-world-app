const {registerUser, loginUser} = require('../controllers/user')
const router = require('express').Router();
const User = require('../models/User');


router.post('/register',registerUser)


router.post('/login',loginUser)

module.exports = router;
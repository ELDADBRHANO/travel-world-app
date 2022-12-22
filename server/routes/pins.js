const router = require('express').Router();
const {create, get}= require('../controllers/pin')


router.post('/',create)

router.get('/',get)

module.exports = router;
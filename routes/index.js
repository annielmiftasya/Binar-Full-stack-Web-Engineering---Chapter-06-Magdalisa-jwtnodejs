var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/auth', require('./users'));

router.use('/car', require('./car'));
module.exports = router;

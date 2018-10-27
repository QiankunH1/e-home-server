var express = require('express');
var router = express.Router();
const adminUserModel = require("../model/adminUser")
const adminUser = require("../controller/adminUser")
router.use(adminUser)

module.exports = router;

var express = require('express');
var router = express.Router();
const adminUserModel = require("../model/adminUser")
const adminUser = require("../controller/adminUser")
const catetory = require("../controller/catetory")
const news = require("../controller/news")
router.use(adminUser)
router.use(catetory)
router.use(news)

module.exports = router;

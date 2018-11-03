var express = require('express');
var router = express.Router();
const adminUserModel = require("../model/adminUser")
const adminUser = require("../controller/adminUser")
const category = require("../controller/category")
const news = require("../controller/news")
router.use(adminUser)
router.use(category)
router.use(news)

module.exports = router;

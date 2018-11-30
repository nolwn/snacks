const express = require("express");

const controllers = require("../controllers/auth");

const router = express.Router();

router.post("/login", controllers.login)

module.exports = router

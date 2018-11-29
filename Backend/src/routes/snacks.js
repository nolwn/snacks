const controllers = require("../controllers/snacks.js");
const express = require('express');

const router = express.Router();

router.get("/", controllers.getAll);
router.get("/:id", controllers.getOne);
router.post("/", controllers.create);

module.exports = router;

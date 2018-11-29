const controllers = require("../controllers/users");
const express = require("express");

const router = express.Router({ mergeParams: true });

router.get("/admin/users", controllers.getAll);
router.get("/:id", controllers.getOne);
router.post("/admin/create", controllers.create);
router.post("/auth/login", controllers.login)

module.exports = router;

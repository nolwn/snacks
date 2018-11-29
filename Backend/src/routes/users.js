const controllers = require("../controllers/users");
const express = require("express");

const authorization = require("../authorization");

const router = express.Router({ mergeParams: true });

/**
 *  OPEN ROUTES -- ANYONE
 */

router.post("/auth/login", controllers.login)

/**
 * AUTHORIZATION ROUTE
 */

router.use(authorization.authorize);

/**
 *  AUTHORIZED ROUTES -- ANYONE WHO IS SIGNED IN
 */

router.get("/:userId/reviews", controllers.getAllReviews);

/**
 * PERMISSION ROUTES
 */

router.use(authorization.verifyPermission);

/**
 *  PERMITTED ROUTES -- ANYONE WHO IS SIGNED IN WITH THE CORRECT PERSMISSIONS
 */

router.get("/admin/users", controllers.getAll);
router.get("/:id", controllers.getOne);
router.post("/admin/create", controllers.create);

module.exports = router;

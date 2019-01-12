const controllers = require("../controllers/users");
const express = require("express");

const authorization = require("../authorization");

const router = express.Router({ mergeParams: true });

/**
 *  OPEN ROUTES:
 *  ANYONE
 */


router.get("/", controllers.getAll);
router.get("/:id", controllers.getOne);
router.post("/create", controllers.create);

/**
 *  AUTHORIZATION ROUTE
 */

router.use(authorization.authorize);

/**
 *  AUTHORIZED ROUTES:
 *  ANYONE WHO IS SIGNED IN
 */

router.get("/:userId/reviews", controllers.getAllReviews);

/**
 *  PERMISSION ROUTES
 */

router.use(authorization.verifyOwnership);

/**
 *  PERMITTED ROUTES:
 *  ANYONE WHO IS SIGNED IN WITH THE CORRECT PERSMISSIONS
 */


module.exports = router;

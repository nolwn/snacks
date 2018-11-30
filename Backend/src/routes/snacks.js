const controllers = require("../controllers/snacks.js");
const express = require('express');

const router = express.Router();

const authorization = require("../authorization");

/**
 * AUTHORIZATION ROUTE
 */
 router.use(authorization.authorize);

/**
 *  AUTHORIZED ROUTES:
 *  ANYONE WHO IS SIGNED IN
 */
 router.get("/", controllers.getAll);
 router.get("/:snackId", controllers.getOne);
 router.get("/:snackId/reviews", controllers.getReviews);
 router.get("/:snackId/rating", controllers.getAverageRating);

/**
 * PERMISSION ROUTES
 */

/**
 *  PERMITTED ROUTES:
 *  ANYONE WHO IS SIGNED IN WITH THE CORRECT PERSMISSIONS
 */
 router.post("/", controllers.create);


module.exports = router;

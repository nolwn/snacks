const express = require("express");

const controllers = require("../controllers/reviews");

const router = express.Router();

/**
 *  PRE-AUTHORIZATION ROUTES
 */

/**
 * AUTHORIZATION ROUTES
 */

/**
 *  AUTHORIZED ROUTES
 */

 router.get("/:userId", controllers.getAll);

 module.exports = router;

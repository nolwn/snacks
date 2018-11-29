const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

function authorize(req, res, next) {
  if (!req.headers.authorization) {
    throw { status: 401, message: "Unauthorized" };
  }

  const [ _scheme, token ] = req.headers.authorization.split(" ");
  const decoded = jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      next({ status: 401, message: "Unauthorized" });

    } else {
      next();
    }
  });
}

function verifyOwnership(req, res, next) {
  next();
}

module.exports = { authorize, verifyOwnership };

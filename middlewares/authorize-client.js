const jwt = require("jsonwebtoken");
const Client = require("../extends/models/client");

module.exports = (req, res, next) => {
  // Format: Authorization: Bearer <access_token>
  // Read header for bearerToken
  const authHeader = req.headers["authorization"];

  if (typeof authHeader !== "undefined") {
    const bearerToken = authHeader.split(" ")[1];
    // Verify bearerToken
    try {
      const { SECRET_KEY } = req.config;
      const authData = jwt.verify(bearerToken, SECRET_KEY);
      const { client } = authData;
      const { clientId, clientSecret, _id } = client;

      Client.findOne({ clientId, clientSecret, _id }, (error, resp) => {
        if (error) {
          // Forbidden
          res.status(403).send({
            status: {
              code: 403,
              message: "Forbidden"
            },
            error
          });
        }
        next();
      });
    } catch (error) {
      // Forbidden
      res.status(403).send({
        status: {
          code: 403,
          message: "Forbidden"
        },
        error
      });
    }
  } else {
    // Forbidden
    res.status(403).send({
      status: {
        code: 403,
        message: "Forbidden"
      }
    });
  }
};

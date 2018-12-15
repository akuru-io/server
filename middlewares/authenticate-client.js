const Client = require("../extends/models/client");

module.exports = (req, res, next) => {
  const clientId = req.body.clientId;
  const clientSecret = req.body.clientSecret;

  Client.find({ clientId, clientSecret }, (error, clients) => {
    if (clients.length > 0) {
      req.client = clients[0];
      next();
    } else {
      res.status(403).send({
        status: {
          code: 403,
          message: "Forbidden"
        }
      });
    }
  });
};

const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  const { SECRET_KEY } = req.config;
  const client = req.client;

  // jwt.sign({ client }, env.SECRET_KEY, { expiresIn: "30s" }, (err, token) => {
  jwt.sign({ client }, SECRET_KEY, (error, token) => {
    if (error) {
      // Forbidden
      res.status(403).send({ status: { code: 403, message: "Forbidden" } });
    }
    res.json({ token });
  });
};

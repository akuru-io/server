const User = require("../../../extends/models/user");
const generator = require("../../../extends/utils/ key-generator");

/**
 * POST api/subscription
 * @param email
 */
module.exports = (req, res) => {
  const user = new User({
    email: req.body.email,
    subscription: { type: "FREE", licenseKey: null }
  });

  user.save((error, userCreated) => {
    if (error) {
      res.status(500).send({
        error: {
          code: 500,
          message: "Internal Server Error",
          meta: userCreationError
        }
      });
    }

    const token = generator({
      _id: userCreated._id,
      email: userCreated.email,
      createdAt: userCreated.createdAt
    });
    res.json({ error: null, body: { user: userCreated, token } });
  });
};

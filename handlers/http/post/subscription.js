const jwt = require("jsonwebtoken");
const generator = require("../../../extends/utils/ key-generator");
const User = require("../../../extends/models/user");
const Subscription = require("../../../extends/models/subscription");

/**
 * POST api/subscription
 * @param email
 */
module.exports = (req, res) => {
  const userObj = {
    email: req.body.email
  };
  const user = new User(userObj);

  // Create user
  user.save((userCreationError, userCreated) => {
    if (userCreationError) {
      res.status(500).send({
        error: {
          code: 500,
          message: "Internal Server Error",
          meta: userCreationError
        }
      });
    }

    // Generate the token
    const token = generator({
      _id: userCreated._id,
      email: userCreated.email,
      createdAt: userCreated.createdAt
    });

    // Update scubscription
    const subs = new Subscription({
      token,
      type: null,
      user: { email: userCreated.email }
    });

    subs.save((error, subsResp) => {
      if (error) {
        res.status(500).send({
          error: {
            code: 500,
            message: "Internal Server Error",
            meta: userCreationError
          }
        });
      }
      res.status(200).send({ error: null, body: { user } });
    });
  });
};

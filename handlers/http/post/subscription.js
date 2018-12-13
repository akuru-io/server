const jwt = require("jsonwebtoken");

const User = require("../../../extends/models/user");
const Subscription = require("../../../extends/models/subscription");

// Token generator
// TODO: Move this to extends/utils/key-generator
function generator(
  payload = {},
  options = {},
  secretKey = process.env.KEYGEN_HASH
) {
  let token;
  try {
    token = jwt.sign(payload, secretKey, options);
  } catch (e) {
    token = null;
  }
  return token;
}

const subscription = (req, res) => {
  // TODO: Authorize the request.
  const userObj = {
    email: req.body.email
  };
  const user = new User(userObj);

  // Create user
  user.save((userCreationError, resp) => {
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
      _id: resp._id,
      email: resp.email,
      createdAt: resp.createdAt
    });

    // Update scubscription
    const subs = new Subscription({
      token,
      type: null,
      user: { email: resp.email }
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

      res.status(200).send({ error: null, body: { user }, token });
    });
  });
};

module.exports = subscription;

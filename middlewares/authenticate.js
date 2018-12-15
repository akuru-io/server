const User = require("../extends/models/user");
const Subscription = require("../extends/models/subscription");

module.exports = (req, res, next) => {
  const email = req.body.email;
  const licenseKey = req.body.licenseKey;

  Subscription.findOne({ licenseKey }, (error, subscription) => {
    if (error) {
      res.status(500).send({
        error: {
          code: 500,
          message: "Internal Server Error",
          meta: error
        }
      });
    }

    if (!subscription) {
      res.status(404).send({
        error: {
          code: 404,
          message: "Subscription Not Found"
        }
      });
    }

    if (
      email !== subscription &&
      subscription.user &&
      subscription.user.email
    ) {
      res.status(404).send({
        error: {
          code: 404,
          message: "User Not Found"
        }
      });
    }

    User.findOne({ email }, (errUsr, theUser) => {
      if (errUsr) {
        res.status(500).send({
          error: {
            code: 500,
            message: "Internal Server Error",
            meta: errUsr
          }
        });
      }

      if (theUser) {
        res.status(404).send({
          error: {
            code: 404,
            message: "User Not Found"
          }
        });
      }

      req.user = theUser;
      next();
    });
  });
};

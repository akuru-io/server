const jwt = require("jsonwebtoken");
const uuid = require("uuid/v4");

const User = require("../../../extends/models/user");
const Subscription = require("../../../extends/models/subscription");

/**
 * POST api/subscription
 * @param email
 */
module.exports = (req, res) => {
  User.findOne({ email: req.body.email }, (errFind, theUser) => {
    if (errFind) {
      res.status(500).send({
        error: {
          code: 500,
          message: "Internal Server Error",
          meta: errFind
        }
      });
    }

    // Generate the licenseKey
    const licenseKey = uuid();

    if (theUser) {
      User.update(
        { email: req.body.email },
        { subscription: { type: "PAID", licenseKey } },
        errUsrUpdate => {
          if (errUsrUpdate) {
            res.status(500).send({
              error: {
                code: 500,
                message: "Internal Server Error",
                meta: errFind
              }
            });
          }

          // Create new subscription
          const subs = new Subscription({
            licenseKey,
            user: {
              email: theUser.email
            }
          });
          subs.save((errSubs, subscription) => {
            if (errSubs) {
              res.status(500).send({
                error: {
                  code: 500,
                  message: "Internal Server Error",
                  meta: errSubs
                }
              });
            }
            res.status(200).send({
              error: null,
              body: { user: theUser, licenseKey }
            });
          });
        }
      );
    } else {
      // Create new subscription
      const subs = new Subscription({
        licenseKey,
        user: {
          email: null
        }
      });
      subs.save((errSubs, subscription) => {
        if (errSubs) {
          res.status(500).send({
            error: {
              code: 500,
              message: "Internal Server Error",
              meta: errSubs
            }
          });
        }
        res.status(200).send({
          error: null,
          body: { licenseKey }
        });
      });
    }
  });
};

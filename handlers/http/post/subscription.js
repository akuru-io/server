const User = require("../../../extends/models/user");

const subscription = (req, res) => {
  // TODO: Should get user data by reading req.body and create new user

  // const user = new User({
  //   email: "user@example.com",
  //   subscription: { type: "FREE", token: "sds" }
  // });

  // user.save((err, user) => {
  //   if (err) return console.error(err);
  //   res.json({ message: `New user created.`, body: req.body });
  // });

  res.json({ message: `subscription`, body: req.body });
};

module.exports = subscription;

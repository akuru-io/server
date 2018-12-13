const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
  {
    type: String,
    token: String
  },
  { _id: false }
);

const UserSchema = new Schema({
  _d: String,
  email: String,
  subscription: subscriptionSchema,
  createdAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;

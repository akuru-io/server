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
  _id: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  subscription: subscriptionSchema,
  createdAt: { type: Date, default: Date.now },
  modifiedAt: Date,
  lastSeen: Date
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;

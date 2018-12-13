const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: String
  },
  { _id: false }
);

const FontSchema = new Schema(
  {
    fontId: String
  },
  { _id: false }
);

const SubscriptionSchema = new Schema({
  _d: String,
  token: String,
  type: String,
  user: UserSchema,
  fonts: {
    type: [FontSchema],
    default: null
  },
  expired: {
    type: Boolean,
    default: false
  },
  willExpireAt: Date,
  createdAt: { type: Date, default: Date.now },
  modifiedAt: Date
});

const SubscriptionModel = mongoose.model("Subscription", SubscriptionSchema);
module.exports = SubscriptionModel;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
  _d: String,
  token: String,
  type: String,
  expired: Boolean,
  willExpireAt: Date,
  createdAt: { type: Date, default: Date.now },
  modifiedAt: Date
});

const SubscriptionModel = mongoose.model("Subscription", SubscriptionSchema);
module.exports = SubscriptionModel;

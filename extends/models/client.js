const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  _id: String,
  clientId: {
    type: String,
    default: uuidv1()
  },
  clientSecret: {
    type: String,
    default: uuidv1()
  },
  clientType: {
    type: String,
    enum: ["Web", "Electron"]
  },
  createdAt: { type: Date, default: Date.now }
});

const ClientModel = mongoose.model("User", ClientSchema);
module.exports = ClientModel;

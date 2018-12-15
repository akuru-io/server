const mongoose = require("mongoose");
const uuid = require("uuid/v4");

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  _id: String,
  clientId: {
    type: String,
    default: uuid(),
    unique: true
  },
  clientSecret: {
    type: String,
    default: uuid(),
    unique: true
  },
  clientType: {
    type: String,
    enum: ["Web", "Electron"]
  },
  createdAt: { type: Date, default: Date.now }
});

const ClientModel = mongoose.model("Client", ClientSchema);
module.exports = ClientModel;

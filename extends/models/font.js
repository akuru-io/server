const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const designerSchema = new Schema(
  {
    name: String,
    gitHubURL: String
  },
  { _id: false }
);

const metaSchema = new Schema(
  {
    coverImageURL: String
  },
  { _id: false }
);

const fontStyleSchema = new Schema(
  {
    styleName: String,
    fontURL: String
  },
  { _id: false }
);

const FontSchema = new Schema({
  _d: String,
  fontID: String,
  familyName: String,
  description: String,
  license: String,
  fontType: String,
  fontStyles: [fontStyleSchema],
  designers: [designerSchema],
  version: String,
  foundry: String,
  issueTrackerURL: String,
  meta: {
    type: metaSchema,
    default: {}
  },
  tags: [String],
  publishedAt: { type: Date, default: Date.now },
  updatedAt: Date
});

const FontModel = mongoose.model("Font", FontSchema);
module.exports = FontModel;

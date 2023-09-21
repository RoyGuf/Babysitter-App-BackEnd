const mongoose = require("../database");
const schema = {
  settings: { type: mongoose.SchemaTypes.Object, required: true },
  layoutVersion: { type: mongoose.SchemaTypes.String, required: true },
  orgId: { type: mongoose.SchemaTypes.String, required: true },
  userId: { type: mongoose.SchemaTypes.String, required: false },
  lastUpdateUserEmail: { type: mongoose.SchemaTypes.String, required: false },
  rendered: { type: mongoose.SchemaTypes.String, required: false },
  pageComponents: [{ type: mongoose.SchemaTypes.Object, required: false }],
  pageComponentsLength: { type: mongoose.SchemaTypes.String, required: false },
  published: { type: mongoose.SchemaTypes.Boolean, default: false, required: false },
  status: { type: mongoose.SchemaTypes.String, required: true },
  contentPointer: { type: mongoose.SchemaTypes.String, required: false },
  previewUrl: { type: mongoose.SchemaTypes.String, required: false },
  history: { type: mongoose.SchemaTypes.Object, required: false },
  pending: { type: mongoose.SchemaTypes.Object, required: false },
  folderId: { type: mongoose.SchemaTypes.String, required: false },
  // pageComponents: [{type: mongoose.Schema.Types.ObjectId, ref: 'PageComponent'}],
};
const collectionName = "pages"; // Name of the collection of documents
const pageSchema = mongoose.Schema(schema, { timestamps: true });
const Page = mongoose.model(collectionName, pageSchema);

pageSchema.index({ orgId: 1 });
pageSchema.index({ userId: 1 });
pageSchema.index({ status: 1 });
pageSchema.index({ pending: 1 });

module.exports = Page;

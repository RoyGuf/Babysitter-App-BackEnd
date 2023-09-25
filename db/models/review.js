import mongoose from "../database.js";

const reviewSchema = new mongoose.Schema({
  babysitter_id: { type: mongoose.SchemaTypes.ObjectId, ref:'Babysitters' },
  customer_id: { type: mongoose.SchemaTypes.ObjectId, ref:'Customers' },
  rate: { type: String, required: [true, 'Rate is required'] },
  customer_email: { type: String, required: [true, 'Customer mail is required'] },
  customer_name: { type: String, required: false },
  description: { type: String, required: [true, 'Description is required'] },
}, { timestamps: true });

const collectionName = "Reviews"; // Name of the collection of documents
const Reviews        = mongoose.model(collectionName, reviewSchema);

reviewSchema.index({ rate: 1, description: 1 });

export default Reviews;

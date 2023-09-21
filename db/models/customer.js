import mongoose from "../database.js";

const customerSchema = new mongoose.Schema({
    // customer_id: { type: String, required: true },
    name: { type: String, required: [true, 'Name is required'] },
    email: { type: String, required: false, unique: true },
    reviews: [{type: mongoose.SchemaTypes.ObjectId, ref:'Reviews'}],
    // updated_at: { type: Date, default: () => Date.now()},
}, { timestamps: true });

const collectionName = "Customer"; // Name of the collection of documents
const Customer       = mongoose.model(collectionName, customerSchema);

customerSchema.index({ email: 1 });

export default Customer;

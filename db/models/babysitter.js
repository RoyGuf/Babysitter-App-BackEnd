import mongoose from "../database";


const babysitterSchema = new mongoose.Schema({
    // babysitter_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    firstName: { type: String, required: [true, 'Name is required'] },
    lastName: { type: String, required: false },
    password: { type: String, required: [true, 'Password is required'] },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    price: { type: String, required: false },
    avatar: {
      public_id: { type: String, required: false },
      url: { type: String, required: false },
    },
    address: {
      city: { type: String, required: false },
      details: { type: String, required: false },
    },
    gender: { type: String, required: false },
    age: { type: String, required: false },
    description: { type: String, required: false },
    ageGroups: { type: [String], required: false },
    reviews: [{type: mongoose.SchemaTypes.ObjectId, ref:'Reviews'}],
}, { timestamps: true });

babysitterSchema.methods.calcAvgRate = function() {
  let sum = 0
  for (let index = 0; index < this.reviews.length; index++) {
    const element = this.reviews[index];
    sum += Number(element.rate)
  }
  return (sum / this.reviews.length).toFixed(1)
}

babysitterSchema.index({ firstName: 1 });

const collectionName = "Babysitters"; // Name of the collection of documents
const Babysitter     = mongoose.model(collectionName, babysitterSchema);



export default Babysitter;

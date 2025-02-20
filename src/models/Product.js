// models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  // ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }], // We'll add this later
  imageUrl: { type: String, required: true }, // We'll handle image uploads later
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
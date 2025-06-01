// import mongoose from 'mongoose';

// const itemSchema = new mongoose.Schema({
//     name: { type: String, required: true, unique: true },
//     description: { type: String, required: true },
//     category: { type: String, required: true },
//     price: { type: Number, required: true },
//     rating: { type: Number, default: 0 },
//     hearts: { type: Number, default: 0 },
//     total: { type: Number, default: 0 },
//     imageUrl: { type: String },
// }, { timestamps: true });

// export default mongoose.model('Item', itemSchema);

import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  imageUrl: { type: String },

  // Nutrition fields
  calories: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },

  // Dietary info
  allergens: [{ type: String }],
  isVeg: { type: Boolean, default: true },
}, { timestamps: true });


export default mongoose.model('Item', itemSchema);

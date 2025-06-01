// import Item from '../modals/item.js';

// export const createItem = async (req, res, next) => {
//     try {
//         const { name, description, category, price, rating, hearts } = req.body;
//         const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

//         // e.g. total might be price * hearts, or some other logic
//         const total = Number(price) * 1; // replace with your own formula

//         const newItem = new Item({
//             name,
//             description,
//             category,
//             price,
//             rating,
//             hearts,
//             imageUrl,
//             total,
//         });

//         const saved = await newItem.save();
//         res.status(201).json(saved);
//     } catch (err) {
//         if (err.code === 11000) {
//             res.status(400).json({ message: 'Item name already exists' });
//         } else next(err);
//     }
// };

// export const getItems = async (_req, res, next) => {
//     try {
//         const items = await Item.find().sort({ createdAt: -1 });
//         // Prefix image URLs with host for absolute path
//         const host = `${_req.protocol}://${_req.get('host')}`;
//         const withFullUrl = items.map(i => ({
//             ...i.toObject(),
//             imageUrl: i.imageUrl ? host + i.imageUrl : '',
//         }));
//         res.json(withFullUrl);
//     } catch (err) {
//         next(err);
//     }
// };

// export const deleteItem = async (req, res, next) => {
//     try {
//         const removed = await Item.findByIdAndDelete(req.params.id);
//         if (!removed) return res.status(404).json({ message: 'Item not found' });
//         res.status(204).end();
//     } catch (err) {
//         next(err);
//     }
// };

import Item from '../modals/item.js';

// Create a new item
export const createItem = async (req, res, next) => {
  try {
    const {
      name,
      description,
      category,
      price,
      rating,
      hearts,
      calories,
      fat,
      protein,
      carbs,
      allergens,
    } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    // Example logic for total, adjust as needed
    const total = Number(price) * (Number(hearts) || 1);

    const newItem = new Item({
      name,
      description,
      category,
      price,
      rating: Number(rating) || 0,
      hearts: Number(hearts) || 0,
      calories: Number(calories) || 0,
      fat: Number(fat) || 0,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      allergens: allergens ? (Array.isArray(allergens) ? allergens : [allergens]) : [],
      imageUrl,
      total,
    });

    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: 'Item name already exists' });
    } else {
      next(err);
    }
  }
};

// Get all items
export const getItems = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    const host = `${req.protocol}://${req.get('host')}`;
    const withFullUrl = items.map(i => ({
      ...i.toObject(),
      imageUrl: i.imageUrl ? host + i.imageUrl : '',
    }));
    res.json(withFullUrl);
  } catch (err) {
    next(err);
  }
};

// Delete an item by ID
export const deleteItem = async (req, res, next) => {
  try {
    const removed = await Item.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Item not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

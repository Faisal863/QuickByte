// // controllers/orderController.js
// import Stripe from 'stripe';
// import Order from '../modals/order.js';
// import 'dotenv/config';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_51RBVS8PhmAwWpofiK6zQKKqHMzp2igdIB9ssuQCXnp1KNX9J3dNiE7ka0KM81RLKUMigN4DyMSWrfKGITOqZ6hOy00ZQagZJ9L");

// // Create Order
// export const createOrder = async (req, res) => {
//     try {
//         const {
//             firstName, lastName, phone, email,
//             address, city, zipCode,
//             paymentMethod, subtotal, tax, total,
//             items
//         } = req.body;

//         if (!items || !Array.isArray(items) || items.length === 0) {
//             return res.status(400).json({ message: 'Invalid or empty items array' });
//         }

//         // Normalize incoming item structure
//         const orderItems = items.map(({ item, name, price, imageUrl, quantity }) => {
//             const base = item || {};
//             return {
//                 item: {
//                     name: base.name || name || 'Unknown',
//                     price: Number(base.price ?? price) || 0,
//                     imageUrl: base.imageUrl || imageUrl || ''
//                 },
//                 quantity: Number(quantity) || 0
//             };
//         });

//         // Default shipping cost
//         const shippingCost = 0;
//         let newOrder;

//         if (paymentMethod === 'online') {
//             const session = await stripe.checkout.sessions.create({
//                 payment_method_types: ['card'],
//                 mode: 'payment',
//                 line_items: orderItems.map(o => ({
//                     price_data: {
//                         currency: 'inr',
//                         product_data: { name: o.item.name },
//                         unit_amount: Math.round(o.item.price * 100)
//                     },
//                     quantity: o.quantity
//                 })),
//                 customer_email: email,
//                 success_url: `${process.env.FRONTEND_URL}/myorder/verify?success=true&session_id={CHECKOUT_SESSION_ID}`,
//                 cancel_url: `${process.env.FRONTEND_URL}/checkout?payment_status=cancel`,
//                 metadata: { firstName, lastName, email, phone }
//             });

//             newOrder = new Order({
//                 user: req.user._id,
//                 firstName, lastName, phone, email,
//                 address, city, zipCode,
//                 paymentMethod, subtotal, tax, total,
//                 shipping: shippingCost,
//                 items: orderItems,
//                 paymentIntentId: session.payment_intent,
//                 sessionId: session.id,
//                 paymentStatus: 'pending'
//             });

//             await newOrder.save();
//             return res.status(201).json({ order: newOrder, checkoutUrl: session.url });
//         }

//         // COD Handling
//         newOrder = new Order({
//             user: req.user._id,
//             firstName, lastName, phone, email,
//             address, city, zipCode,
//             paymentMethod, subtotal, tax, total,
//             shipping: shippingCost,
//             items: orderItems,
//             paymentStatus: 'succeeded'
//         });

//         await newOrder.save();
//         res.status(201).json({ order: newOrder, checkoutUrl: null });
//     } catch (error) {
//         console.error('createOrder error:', error);
//         // ...error handling unchanged...
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };

// // Confirm Payment
// export const confirmPayment = async (req, res) => {
//     try {
//         const { session_id } = req.query;
//         if (!session_id) return res.status(400).json({ message: 'session_id required' });

//         const session = await stripe.checkout.sessions.retrieve(session_id);
//         if (session.payment_status === 'paid') {
//             const order = await Order.findOneAndUpdate(
//                 { sessionId: session_id },
//                 { paymentStatus: 'succeeded' },
//                 { new: true }
//             );
//             if (!order) return res.status(404).json({ message: 'Order not found' });
//             return res.json(order);
//         }
//         return res.status(400).json({ message: 'Payment not completed' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error', error: err.message });
//     }
// };

// // Get Orders
// export const getOrders = async (req, res) => {
//     try {
//         // only return orders belonging to this user
//         const filter = { user: req.user._id };
//         const rawOrders = await Order.find(filter).sort({ createdAt: -1 }).lean();

//         // Format for front-end
//         const formatted = rawOrders.map(o => ({
//             ...o,
//             items: o.items.map(i => ({
//                 _id: i._id,
//                 item: i.item,
//                 quantity: i.quantity
//             })),
//             createdAt: o.createdAt,
//             paymentStatus: o.paymentStatus
//         }));

//         res.json(formatted);
//     } catch (error) {
//         console.error('getOrders error:', error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };

// export const getAllOrders = async (req, res) => {
//     try {
//         const raw = await Order
//             .find({})
//             .sort({ createdAt: -1 })
//             .lean();

//         const formatted = raw.map(o => ({
//             _id: o._id,
//             user: o.user,
//             firstName: o.firstName,
//             lastName: o.lastName,
//             email: o.email,
//             phone: o.phone,

//             // ← ADD these three:
//             address: o.address ?? o.shippingAddress?.address ?? '',
//             city: o.city ?? o.shippingAddress?.city ?? '',
//             zipCode: o.zipCode ?? o.shippingAddress?.zipCode ?? '',

//             paymentMethod: o.paymentMethod,
//             paymentStatus: o.paymentStatus,
//             status: o.status,
//             createdAt: o.createdAt,

//             items: o.items.map(i => ({
//                 _id: i._id,
//                 item: i.item,
//                 quantity: i.quantity
//             }))
//         }));

//         res.json(formatted);
//     } catch (error) {
//         console.error('getAllOrders error:', error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };


// // NEW: updateAnyOrder — no ownership check
// export const updateAnyOrder = async (req, res) => {
//     try {
//         const updated = await Order.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true, runValidators: true }
//         );
//         if (!updated) {
//             return res.status(404).json({ message: 'Order not found' });
//         }
//         res.json(updated);
//     } catch (error) {
//         console.error('updateAnyOrder error:', error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };


// // Get Order by ID
// export const getOrderById = async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id);
//         if (!order) return res.status(404).json({ message: 'Order not found' });

//         if (!order.user.equals(req.user._id)) {
//             return res.status(403).json({ message: 'Access denied' });
//         }

//         if (req.query.email && order.email !== req.query.email) {
//             return res.status(403).json({ message: 'Access denied' });
//         }
//         res.json(order);
//     } catch (error) {
//         console.error('getOrderById error:', error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };

// // Update Order
// export const updateOrder = async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id);
//         if (!order) return res.status(404).json({ message: 'Order not found' });

//         if (!order.user.equals(req.user._id)) {
//             return res.status(403).json({ message: 'Access denied' });
//         }

//         if (req.body.email && order.email !== req.body.email) {
//             return res.status(403).json({ message: 'Access denied' });
//         }
//         const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updated);
//     } catch (error) {
//         console.error('updateOrder error:', error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };

import Stripe from 'stripe';
import Order from '../modals/order.js';
import sendEmail from '../utils/sendEmail.js';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_51RBVS8PhmAwWpofiK6zQKKqHMzp2igdIB9ssuQCXnp1KNX9J3dNiE7ka0KM81RLKUMigN4DyMSWrfKGITOqZ6hOy00ZQagZJ9L");

// Generate email HTML content
const generateOrderEmail = (order) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2 style="color: #2E8B57;">🍽️ Thank you for your order, ${order.firstName}!</h2>
      <p style="font-size: 16px;">We're preparing your food and will deliver it soon.</p>

      <h3>📋 Order Summary</h3>
      <ul style="padding: 0; list-style-type: none;">
        ${order.items.map(i => `
          <li style="margin-bottom: 8px;">
            <strong>${i.item.name}</strong> x${i.quantity} — ₹${i.item.price * i.quantity}
          </li>`).join('')}
      </ul>

      <p><strong>Subtotal:</strong> ₹${order.subtotal}</p>
      <p><strong>Tax:</strong> ₹${order.tax}</p>
      <p><strong>Total:</strong> ₹${order.total}</p>

      <h3>📍 Delivery Details</h3>
      <p>${order.address}, ${order.city}, ${order.zipCode}</p>

      <p><strong>📞 Contact:</strong> ${order.phone}</p>
      <p><strong>💳 Payment Method:</strong> ${order.paymentMethod}</p>

      <hr />
      <p style="font-size: 14px; color: gray;">QuickByte • ${new Date().getFullYear()}</p>
    </div>
  `;
};

// Create Order
// export const createOrder = async (req, res) => {
//   try {
//     const {
//       firstName, lastName, phone, email,
//       address, city, zipCode,
//       paymentMethod, subtotal, tax, total,
//       items
//     } = req.body;

//     if (!items || !Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({ message: 'Invalid or empty items array' });
//     }

//     const orderItems = items.map(({ item, name, price, imageUrl, quantity }) => {
//       const base = item || {};
//       return {
//         item: {
//           name: base.name || name || 'Unknown',
//           price: Number(base.price ?? price) || 0,
//           imageUrl: base.imageUrl || imageUrl || ''
//         },
//         quantity: Number(quantity) || 0
//       };
//     });

//     const shippingCost = 0;
//     let newOrder;

//     if (paymentMethod === 'online') {
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         mode: 'payment',
//         line_items: orderItems.map(o => ({
//           price_data: {
//             currency: 'inr',
//             product_data: { name: o.item.name },
//             unit_amount: Math.round(o.item.price * 100)
//           },
//           quantity: o.quantity
//         })),
//         customer_email: email,
//         success_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/myorder/verify?success=true&session_id={CHECKOUT_SESSION_ID}`,
//         cancel_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/checkout?payment_status=cancel`,
//         metadata: { firstName, lastName, email, phone }
//       });

//       newOrder = new Order({
//         user: req.user._id,
//         firstName, lastName, phone, email,
//         address, city, zipCode,
//         paymentMethod, subtotal, tax, total,
//         shipping: shippingCost,
//         items: orderItems,
//         paymentIntentId: session.payment_intent,
//         sessionId: session.id,
//         paymentStatus: 'pending'
//       });

//       await newOrder.save();
//       return res.status(201).json({ order: newOrder, checkoutUrl: session.url });
//     }

//     // COD Handling
//     newOrder = new Order({
//       user: req.user._id,
//       firstName, lastName, phone, email,
//       address, city, zipCode,
//       paymentMethod, subtotal, tax, total,
//       shipping: shippingCost,
//       items: orderItems,
//       paymentStatus: 'succeeded'
//     });

//     await newOrder.save();

//     // ✅ Send confirmation email
//     // await sendEmail(email, 'Order Confirmation', generateOrderEmail(newOrder));

//     res.status(201).json({ order: newOrder, checkoutUrl: null });
//   } catch (error) {
//     console.error('createOrder error:', error);
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// };




export const createOrder = async (req, res) => {
  try {
    const {
      firstName, lastName, phone, email,
      address, city, zipCode,
      paymentMethod, subtotal, tax, total,
      items
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Invalid or empty items array' });
    }

    // Process items for order and nutrition calculation
    const orderItems = items.map(({ item, name, price, imageUrl, quantity }) => {
      const base = item || {};
      return {
        item: {
          name: base.name || name || 'Unknown',
          price: Number(base.price ?? price) || 0,
          imageUrl: base.imageUrl || imageUrl || '',
          calories: Number(base.calories ?? 0),
          sodium: Number(base.sodium ?? 0),
          fat: Number(base.fat ?? 0),
          protein: Number(base.protein ?? 0),
          allergens: base.allergens || []
        },
        quantity: Number(quantity) || 0
      };
    });

    // Calculate total nutrition
    const nutritionTotals = orderItems.reduce((totals, i) => {
      totals.calories += i.item.calories * i.quantity;
      totals.sodium += i.item.sodium * i.quantity;
      totals.fat += i.item.fat * i.quantity;
      totals.protein += i.item.protein * i.quantity;
      return totals;
    }, { calories: 0, sodium: 0, fat: 0, protein: 0 });

    // Generate simple health warnings
    const healthWarnings = [];

    if (nutritionTotals.sodium > 1500) {
      healthWarnings.push("This meal is high in sodium. Consider swapping fries with a fresh salad for a healthier option.");
    }

    if (nutritionTotals.calories > 2000) {
      healthWarnings.push("Your meal exceeds typical daily calorie needs. Try lighter options if you're watching calories.");
    }

    // You can add more rules here (e.g., allergens, fat, protein)

    const shippingCost = 0;
    let newOrder;

    if (paymentMethod === 'online') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: orderItems.map(o => ({
          price_data: {
            currency: 'inr',
            product_data: { name: o.item.name },
            unit_amount: Math.round(o.item.price * 100)
          },
          quantity: o.quantity
        })),
        customer_email: email,
        success_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/myorder/verify?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/checkout?payment_status=cancel`,
        metadata: { firstName, lastName, email, phone }
      });

      newOrder = new Order({
        user: req.user._id,
        firstName, lastName, phone, email,
        address, city, zipCode,
        paymentMethod, subtotal, tax, total,
        shipping: shippingCost,
        items: orderItems,
        paymentIntentId: session.payment_intent,
        sessionId: session.id,
        paymentStatus: 'pending'
      });

      await newOrder.save();
      return res.status(201).json({ order: newOrder, checkoutUrl: session.url, healthWarnings });
    }

    // COD Handling
    newOrder = new Order({
      user: req.user._id,
      firstName, lastName, phone, email,
      address, city, zipCode,
      paymentMethod, subtotal, tax, total,
      shipping: shippingCost,
      items: orderItems,
      paymentStatus: 'succeeded'
    });

    await newOrder.save();

    res.status(201).json({ order: newOrder, checkoutUrl: null, healthWarnings });
  } catch (error) {
    console.error('createOrder error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Confirm Payment
export const confirmPayment = async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) return res.status(400).json({ message: 'session_id required' });

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status === 'paid') {
      const order = await Order.findOneAndUpdate(
        { sessionId: session_id },
        { paymentStatus: 'succeeded' },
        { new: true }
      );

      if (!order) return res.status(404).json({ message: 'Order not found' });

      // ✅ Send confirmation email
      await sendEmail(order.email, 'Order Confirmation', generateOrderEmail(order));

      return res.json(order);
    }
    return res.status(400).json({ message: 'Payment not completed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Get Orders
export const getOrders = async (req, res) => {
  try {
    const filter = { user: req.user._id };
    const rawOrders = await Order.find(filter).sort({ createdAt: -1 }).lean();

    const formatted = rawOrders.map(o => ({
      ...o,
      items: o.items.map(i => ({
        _id: i._id,
        item: i.item,
        quantity: i.quantity
      })),
      createdAt: o.createdAt,
      paymentStatus: o.paymentStatus
    }));

    res.json(formatted);
  } catch (error) {
    console.error('getOrders error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const raw = await Order.find({}).sort({ createdAt: -1 }).lean();

    const formatted = raw.map(o => ({
      _id: o._id,
      user: o.user,
      firstName: o.firstName,
      lastName: o.lastName,
      email: o.email,
      phone: o.phone,
      address: o.address ?? o.shippingAddress?.address ?? '',
      city: o.city ?? o.shippingAddress?.city ?? '',
      zipCode: o.zipCode ?? o.shippingAddress?.zipCode ?? '',
      paymentMethod: o.paymentMethod,
      paymentStatus: o.paymentStatus,
      status: o.status,
      createdAt: o.createdAt,
      items: o.items.map(i => ({
        _id: i._id,
        item: i.item,
        quantity: i.quantity
      }))
    }));

    res.json(formatted);
  } catch (error) {
    console.error('getAllOrders error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update Any Order (admin)
// export const updateAnyOrder = async (req, res) => {
//   try {
//     const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true
//     });

//     if (!updated) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.json(updated);
//   } catch (error) {
//     console.error('updateAnyOrder error:', error);
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// };




export const updateAnyOrder = async (req, res) => {
  try {
    // Fetch current order before update
    const previousOrder = await Order.findById(req.params.id);
    if (!previousOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update order
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Check if order status changed
    if (req.body.status && req.body.status !== previousOrder.status) {
      let emailSubject = `Your order status is now "${req.body.status}"`;
      let emailBody = '';

      switch (req.body.status) {
        case 'processing':
          emailBody = `
            <h3>Your order is now being processed.</h3>
            <p>We're preparing your delicious food!</p>
          `;
          break;
        case 'outForDelivery':
          emailBody = `
            <h3>Your order is out for delivery.</h3>
            <p>Your food is on the way, hang tight!</p>
          `;
          break;
        case 'delivered':
          emailBody = `
            <h3>Your order has been delivered.</h3>
            <p>We hope you enjoy your meal! Thank you for choosing us.</p>
          `;
          break;
        default:
          emailBody = `<p>Your order status has been updated to ${req.body.status}.</p>`;
      }

      // Send email notification
      await sendEmail(updatedOrder.email, emailSubject, emailBody);
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error('updateAnyOrder error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get Order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (!order.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (req.query.email && order.email !== req.query.email) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    console.error('getOrderById error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update User Order
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (!order.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (req.body.email && order.email !== req.body.email) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    console.error('updateOrder error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { useCart } from '../../CartContext/CartContext';
// import { FaMinus, FaPlus } from 'react-icons/fa';
// import './Omh.css';

// const categories = ['Breakfast', 'Lunch', 'Dinner', 'Mexican', 'Italian', 'Desserts', 'Drinks'];

// const OurMenuHome = () => {
//   const [activeCategory, setActiveCategory] = useState(categories[0]);
//   const [menuData, setMenuData] = useState({});
//   const { cartItems: rawCart, addToCart, updateQuantity, removeFromCart } = useCart();

//   const cartItems = rawCart.filter(ci => ci.item);

//   useEffect(() => {
//     axios.get('http://localhost:4000/api/items')
//       .then(res => {
//         const grouped = res.data.reduce((acc, item) => {
//           acc[item.category] = acc[item.category] || [];
//           acc[item.category].push(item);
//           return acc;
//         }, {});
//         setMenuData(grouped);
//       })
//       .catch(console.error);
//   }, []);

//   // Find cart entry by product ID
//   const getCartEntry = id => cartItems.find(ci => ci.item?._id === id);
//   const getQuantity = id => getCartEntry(id)?.quantity ?? 0;
//   const displayItems = (menuData[activeCategory] || []).slice(0, 4);

//   return (
//     <div className="bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200">
//           <span className="font-dancingscript block text-5xl sm:text-6xl md:text-7xl mb-2">
//             Our Exquisite Menu
//           </span>
//           <span className="block text-xl sm:text-2xl md:text-3xl font-cinzel mt-4 text-amber-100/80">
//             A Symphony of Flavors
//           </span>
//         </h2>

//         {/* Category buttons */}
//         <div className="flex flex-wrap justify-center gap-4 mb-16">
//           {categories.map(cat => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-4 sm:px-6 py-2 rounded-full border-2 transition-all duration-300 transform font-cinzel text-sm sm:text-lg tracking-widest backdrop-blur-sm ${
//                 activeCategory === cat
//                   ? 'bg-gradient-to-br from-amber-900/80 to-amber-700/80 border-amber-800 scale-105 shadow-xl shadow-amber-900/30'
//                   : 'bg-amber-900/20 border-amber-800/30 text-amber-100/80 hover:bg-amber-800/40 hover:scale-95'
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Menu grid */}
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
//           {displayItems.map((item, i) => {
//             const qty = getQuantity(item._id);
//             const cartEntry = getCartEntry(item._id);

//             return (
//               <div
//                 key={item._id}
//                 className="relative bg-amber-900/20 rounded-2xl overflow-hidden border border-amber-800/30 backdrop-blur-sm flex flex-col transition-all duration-500"
//                 style={{ '--index': i }}
//               >
//                 <div className="relative h-48 sm:h-56 md:h-60 flex items-center justify-center bg-black/10">
//                   <img
//                     src={item.imageUrl}
//                     alt={item.name}
//                     className="max-h-full max-w-full object-contain transition-all duration-700"
//                   />
//                 </div>

//                 <div className="p-4 sm:p-6 flex flex-col flex-grow">
//                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-amber-800/50 to-transparent opacity-50 transition-all duration-300" />
//                   <h3 className="text-xl sm:text-2xl mb-2 font-dancingscript text-amber-100 transition-colors">
//                     {item.name}
//                   </h3>
//                   <p className="text-amber-100/80 text-xs sm:text-sm mb-4 font-cinzel leading-relaxed">
//                     {item.description}
//                   </p>

//                   {/* Price & Cart Controls */}
//                   <div className="mt-auto flex items-center gap-4 justify-between">
//                     <div className="bg-amber-100/10 backdrop-blur-sm px-3 py-1 rounded-2xl shadow-lg">
//                       <span className="text-xl font-bold text-amber-300 font-dancingscript">
//                         ₹{Number(item.price).toFixed(2)}
//                       </span>
//                     </div>

//                     <div className="flex items-center gap-2">
//                       {qty > 0 ? (
//                         <div className="flex items-center gap-2">
//                           <button
//                             onClick={() =>
//                               qty > 1
//                                 ? updateQuantity(cartEntry?._id, qty - 1)
//                                 : removeFromCart(cartEntry._id)
//                             }
//                             className="w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-colors"
//                           >
//                             <FaMinus className="text-amber-100" />
//                           </button>
//                           <span className="w-8 text-center text-amber-100">
//                             {qty}
//                           </span>
//                           <button
//                             onClick={() => updateQuantity(cartEntry._id, qty + 1)}
//                             className="w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-colors"
//                           >
//                             <FaPlus className="text-amber-100" />
//                           </button>
//                         </div>
//                       ) : (
//                         <button
//                           onClick={() => addToCart(item, 1)}
//                           className="bg-amber-900/40 px-4 py-1.5 rounded-full font-cinzel text-xs sm:text-sm uppercase tracking-widest transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:shadow-amber-900/20 relative overflow-hidden border border-amber-800/50"
//                         >
//                           <span className="relative z-10 text-xs text-black">
//                             Add to Cart
//                           </span>
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Full menu link */}
//         <div className="flex justify-center mt-16">
//           <Link
//             to="/menu"
//             className="bg-amber-900/30 border-2 border-amber-800/30 text-amber-100 px-8 sm:px-10 py-3 rounded-full font-cinzel uppercase tracking-widest transition-all duration-300 hover:bg-amber-800/40 hover:text-amber-50 hover:scale-105 hover:shadow-lg hover:shadow-amber-900/20 backdrop-blur-sm"
//           >
//             Explore Full Menu
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OurMenuHome;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useCart } from '../../CartContext/CartContext';
// import { FaMinus, FaPlus } from 'react-icons/fa';
// import './Om.css';

// const categories = ['Breakfast', 'Lunch', 'Dinner', 'Mexican', 'Italian', 'Desserts', 'Drinks'];

// const OurMenu = () => {
//   const [activeCategory, setActiveCategory] = useState(categories[0]);
//   const [menuData, setMenuData] = useState({});
//   const { cartItems: rawCart, addToCart, updateQuantity, removeFromCart } = useCart();

//   const cartItems = rawCart.filter(ci => ci.item);

//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         const res = await axios.get('http://localhost:4000/api/items');
//         const byCategory = res.data.reduce((acc, item) => {
//           const cat = item.category || 'Uncategorized';
//           acc[cat] = acc[cat] || [];
//           acc[cat].push(item);
//           return acc;
//         }, {});
//         setMenuData(byCategory);
//       } catch (err) {
//         console.error('Failed to load menu items:', err);
//       }
//     };
//     fetchMenu();
//   }, []);

//   // helper: find cart entry by product ID
//   const getCartEntry = id => cartItems.find(ci => ci.item?._id === id);
//   const getQuantity  = id => getCartEntry(id)?.quantity ?? 0;

//   // items to display in active category
//   const displayItems = (menuData[activeCategory] ?? []).slice(0, 12);

//   return (
//     <div className="bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Title */}
//         <h2 className="text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200">
//           <span className="font-dancingscript block text-5xl sm:text-6xl md:text-7xl mb-2">
//             Our Exquisite Menu
//           </span>
//           <span className="block text-xl sm:text-2xl md:text-3xl font-cinzel mt-4 text-amber-100/80">
//             A Symphony of Flavors
//           </span>
//         </h2>

//         {/* Category Tabs */}
//         <div className="flex flex-wrap justify-center gap-4 mb-16">
//           {categories.map(cat => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-4 sm:px-6 py-2 rounded-full border-2 transition-all duration-300 transform font-cinzel text-sm sm:text-lg tracking-widest backdrop-blur-sm ${
//                 activeCategory === cat
//                   ? 'bg-gradient-to-br from-amber-900/80 to-amber-700/80 border-amber-800 scale-105 shadow-xl shadow-amber-900/30'
//                   : 'bg-amber-900/20 border-amber-800/30 text-amber-100/80 hover:bg-amber-800/40 hover:scale-95'
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Menu Grid */}
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
//           {displayItems.map((item, i) => {
//             const cartEntry = getCartEntry(item._id);
//             const quantity  = cartEntry?.quantity || 0;

//             return (
//               <div
//                 key={item._id}
//                 className="relative bg-amber-900/20 rounded-2xl overflow-hidden border border-amber-800/30 backdrop-blur-sm flex flex-col transition-all duration-500"
//                 style={{ '--index': i }}
//               >
//                 {/* Image */}
//                 <div className="relative h-48 sm:h-56 md:h-60 flex items-center justify-center bg-black/10">
//                   <img
//                     src={item.imageUrl || item.image}
//                     alt={item.name}
//                     className="max-h-full max-w-full object-contain transition-all duration-700"
//                   />
//                 </div>

//                 {/* Details */}
//                 <div className="p-4 sm:p-6 flex flex-col flex-grow">
//                   <h3 className="text-xl sm:text-2xl mb-2 font-dancingscript text-amber-100">
//                     {item.name}
//                   </h3>
//                   <p className="text-amber-100/80 text-xs sm:text-sm mb-4 font-cinzel leading-relaxed">
//                     {item.description}
//                   </p>

//                   {/* Price & Cart Controls */}
//                   <div className="mt-auto flex items-center gap-4 justify-between">
//                     <div className="bg-amber-100/10 backdrop-blur-sm px-3 py-1 rounded-2xl shadow-lg">
//                       <span className="text-xl font-bold text-amber-300 font-dancingscript">
//                         ₹{Number(item.price).toFixed(2)}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       {quantity > 0 ? (
//                         <>
//                           <button
//                             onClick={() =>
//                               quantity > 1
//                                 ? updateQuantity(cartEntry?._id, quantity - 1)
//                                 : removeFromCart(cartEntry._id)
//                             }
//                             className="w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-colors"
//                           >
//                             <FaMinus className="text-amber-100" />
//                           </button>
//                           <span className="w-8 text-center text-amber-100">
//                             {quantity}
//                           </span>
//                           <button
//                             onClick={() => updateQuantity(cartEntry._id, quantity + 1)}
//                             className="w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-colors"
//                           >
//                             <FaPlus className="text-amber-100" />
//                           </button>
//                         </>
//                       ) : (
//                         <button
//                           onClick={() => addToCart(item, 1)}
//                           className="bg-amber-900/40 px-4 py-1.5 rounded-full font-cinzel text-xs sm:text-sm uppercase tracking-widest transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:shadow-amber-900/20 overflow-hidden border border-amber-800/50"
//                         >
//                           Add to Cart
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OurMenu;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../CartContext/CartContext';
import { FaMinus, FaPlus } from 'react-icons/fa';
import './Omh.css'; // Assuming Om.css might still contain some specific styles not covered by Tailwind

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Mexican', 'Italian', 'Desserts', 'Drinks'];

const OurMenu = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [menuData, setMenuData] = useState({});
  const { cartItems: rawCart, addToCart, updateQuantity, removeFromCart } = useCart();

  const cartItems = rawCart.filter(ci => ci.item);
  const url = 'http://localhost:4000'
// const url = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`${url}/api/items`);
        const byCategory = res.data.reduce((acc, item) => {
          const cat = item.category || 'Uncategorized';
          acc[cat] = acc[cat] || [];
          acc[cat].push(item);
          return acc;
        }, {});
        setMenuData(byCategory);
      } catch (err) {
        console.error('Failed to load menu items:', err);
      }
    };
    fetchMenu();
  }, []);

  // helper: find cart entry by product ID
  const getCartEntry = id => cartItems.find(ci => ci.item?._id === id);
  const getQuantity = id => getCartEntry(id)?.quantity ?? 0;

  // items to display in active category
  const displayItems = (menuData[activeCategory] ?? []).slice(0, 12);

  return (
      // Changed background to match Banner's light background, removed gradient
      <div className="bg-orange-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans"> {/* Added font-sans here */}
        <div className="max-w-7xl mx-auto">
          {/* Title - Adapted from Banner.jsx h1 style */}
          <h2 className="text-center mb-12 text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
            Our Exquisite <span className="text-orange-500">Menu</span>
          </h2>
          <p className="text-center text-gray-600 text-lg max-w-md mx-auto mb-16">
            A Symphony of Flavors
          </p>

          {/* Category Tabs - Adapted button styles */}
          {/* <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 py-2 rounded-full border-2 transition-all duration-300 transform font-bold text-sm sm:text-lg tracking-widest
                ${activeCategory === cat
                  ? 'bg-orange-500 text-white border-orange-500 scale-105 shadow-lg shadow-orange-500/30' // Active state
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-orange-100 hover:border-orange-300 hover:scale-[1.02]' // Inactive state
                }`}
            >
              {cat}
            </button>
          ))}
        </div> */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 sm:px-6 py-2 rounded-full border-2 transition-all duration-300 transform font-bold text-sm sm:text-lg tracking-widest
        ${activeCategory === cat
                        ? 'bg-orange-500 text-white border-orange-500 scale-105 shadow-lg shadow-orange-500/30' // Active state
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-orange-100 hover:border-orange-300 hover:scale-[1.02]' // Inactive state
                    }
        ${(cat === 'Breakfast' || cat === 'Lunch' || cat === 'Dinner' || cat === 'Mexican' || cat === 'Italian' || cat === 'Desserts' || cat === 'Drinks') ? 'font-serif text-orange-700' : ''} // Apply specific styles here
      `}
                >
                  {cat}
                </button>
            ))}
          </div>

          {/* Menu Grid - Adapted card styles */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {displayItems.map((item, i) => {
              const cartEntry = getCartEntry(item._id);
              const quantity = cartEntry?.quantity || 0;

              return (
                  <div
                      key={item._id}
                      className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md flex flex-col transition-all duration-500 hover:shadow-lg hover:-translate-y-1" // Updated card appearance
                      style={{ '--index': i }}
                  >
                    {/* Image */}
                    <div className="relative h-48 sm:h-56 md:h-60 flex items-center justify-center bg-gray-100"> {/* Lighter background for image */}
                      <img
                          src={item.imageUrl || item.image}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain transition-all duration-700"
                      />
                    </div>

                    {/* Details */}
                    <div className="p-4 sm:p-6 flex flex-col flex-grow">
                      {/* Item Name - Using gray-800, font-bold, font-sans */}
                      <h3 className="text-xl sm:text-2xl mb-2 font-bold font-sans text-gray-800">
                        {item.name}
                      </h3>
                      {/* Description - Using gray-600, font-sans */}
                      <p className="text-gray-600 text-xs sm:text-sm mb-4 font-sans leading-relaxed">
                        {item.description}
                      </p>

                      {/* Price & Cart Controls */}
                      <div className="mt-auto flex items-center gap-4 justify-between">
                        {/* Price - Using orange-500 for price accent, font-bold, font-sans */}
                        <div className="bg-orange-100/50 px-3 py-1 rounded-2xl shadow-sm">
                      <span className="text-xl font-bold text-orange-500 font-sans">
                        ₹{Number(item.price).toFixed(2)}
                      </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {quantity > 0 ? (
                              <>
                                <button
                                    onClick={() =>
                                        quantity > 1
                                            ? updateQuantity(cartEntry?._id, quantity - 1)
                                            : removeFromCart(cartEntry._id)
                                    }
                                    className="w-8 h-8 rounded-full bg-orange-500/80 flex items-center justify-center text-white hover:bg-orange-600 transition-colors" // Adjusted button styles
                                >
                                  <FaMinus />
                                </button>
                                <span className="w-8 text-center text-gray-800 font-sans font-bold">
                            {quantity}
                          </span>
                                <button
                                    onClick={() => updateQuantity(cartEntry._id, quantity + 1)}
                                    className="w-8 h-8 rounded-full bg-orange-500/80 flex items-center justify-center text-white hover:bg-orange-600 transition-colors" // Adjusted button styles
                                >
                                  <FaPlus />
                                </button>
                              </>
                          ) : (
                              <button
                                  onClick={() => addToCart(item, 1)}
                                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-widest transition-transform duration-300 hover:scale-110 shadow-lg hover:shadow-orange-400/30" // Adjusted button styles
                              >
                                Add to Cart
                              </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>
        </div>
      </div>
  );
};

export default OurMenu;
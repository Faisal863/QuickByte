// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaStar, FaHeart, FaPlus, FaFire } from 'react-icons/fa';
// import { HiMinus, HiPlus } from 'react-icons/hi';
// import { useCart } from '../../CartContext/CartContext';
// import FloatingParticle from '../FloatingParticle/FloatingParticle';

// const SpecialOffer = () => {
//   const [showAll, setShowAll] = useState(false);
//   const [items, setItems] = useState([]);
//   const { addToCart, updateQuantity, removeFromCart, cartItems: rawCart } = useCart();

//   // only keep cart entries with a real `item`
//   const cartItems = rawCart.filter(ci => ci.item);


//   // Fetch menu items
//   useEffect(() => {
//     axios
//       .get('http://localhost:4000/api/items')
//       .then(res => setItems(res.data.items ?? res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const displayList = Array.isArray(items) ? items.slice(0, showAll ? 8 : 4) : [];

//   return (
//     <div className="bg-gradient-to-b from-[#1a1212] to-[#2a1e1e] text-white py-16 px-4 font-['Poppins']">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-14">
//           <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent italic">
//             Today's <span className="text-stroke-gold">Special</span> Offers
//           </h1>
//           <p className="text-lg text-gray-300 max-w-3xl mx-auto">
//             Savor the extraordinary with our culinary masterpieces crafted to perfection
//           </p>
//         </div>

//         {/* Offers Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {displayList.map(item => {
//             const cartItem = cartItems.find(ci => ci.item?._id === item._id);
//             const qty = cartItem?.quantity ?? 0;
//             const cartId = cartItem?._id;

//             return (
//               <div
//                 key={item._id}
//                 className="relative group bg-[#4b3b3b] rounded-3xl overflow-hidden shadow-2xl hover:-translate-y-4 transition duration-500 hover:shadow-red-900/40 border-2 border-transparent hover:border-amber-500/20"
//               >
//                 {/* Image & Stats */}
//                 <div className="relative h-72 overflow-hidden">
//                   <img
//                     src={item.imageUrl}
//                     alt={item.name}
//                     className="w-full h-full object-cover brightness-90 group-hover:brightness-110 duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
//                   <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
//                     <span className="flex items-center gap-2 text-amber-400">
//                       <FaStar /><b>{item.rating}</b>
//                     </span>
//                     <span className="flex items-center gap-2 text-red-400">
//                       <FaHeart /><b>{item.hearts}</b>
//                     </span>
//                   </div>
//                 </div>

//                 {/* Content & Cart Controls */}
//                 <div className="p-6">
//                   <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent italic">
//                     {item.name}
//                   </h3>
//                   <p className="text-gray-300 mb-5 text-sm">{item.description}</p>
//                   <div className="flex items-center justify-between gap-4">
//                     <span className="text-2xl font-bold text-amber-400">
//                       ₹{Number(item.price).toFixed(2)}
//                     </span>

//                     {qty > 0 ? (
//                       <div className="flex items-center gap-3">
//                         <button
//                           onClick={() =>
//                             qty > 1
//                               ? updateQuantity(cartId, qty - 1)
//                               : removeFromCart(cartId)
//                           }
//                           className="w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center"
//                         >
//                           <HiMinus className="w-4 h-4 text-amber-100" />
//                         </button>
//                         <span className="w-8 text-center text-amber-100">{qty}</span>
//                         <button
//                           onClick={() => updateQuantity(cartId, qty + 1)}
//                           className="w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center"
//                         >
//                           <HiPlus className="w-4 h-4 text-amber-100" />
//                         </button>
//                       </div>
//                     ) : (
//                       <button
//                         onClick={() => addToCart(item, 1)}
//                         className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 text-white px-5 py-2.5 rounded-xl font-bold"
//                       >
//                         <FaPlus />
//                         <span>Add</span>
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {/* Floating Particles */}
//                 <FloatingParticle className="opacity-0 group-hover:opacity-100 absolute inset-0 pointer-events-none" />
//               </div>
//             );
//           })}
//         </div>

//         {/* Show More / Show Less */}
//         <div className="mt-12 flex justify-center">
//           <button
//             onClick={() => setShowAll(!showAll)}
//             className="flex items-center gap-3 bg-gradient-to-r from-red-700 to-amber-700 text-white px-8 py-4 rounded-2xl font-bold uppercase"
//           >
//             <FaFire className="animate-pulse" />
//             <span>{showAll ? 'Show Less' : 'Show More'}</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpecialOffer;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaHeart, FaPlus, FaFire } from 'react-icons/fa';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { useCart } from '../../CartContext/CartContext';
import FloatingParticle from '../FloatingParticle/FloatingParticle';

const SpecialOffer = () => {
  const [showAll, setShowAll] = useState(false);
  const [items, setItems] = useState([]);
  const { addToCart, updateQuantity, removeFromCart, cartItems: rawCart } = useCart();

  const cartItems = rawCart.filter(ci => ci.item);
  const url = 'http://localhost:4000'
// const url = import.meta.env.VITE_API_URL;


  useEffect(() => {
    axios
        .get(`${url}/api/items`)
        .then(res => setItems(res.data.items ?? res.data))
        .catch(err => console.error(err));
  }, []);

  const displayList = Array.isArray(items) ? items.slice(0, showAll ? 8 : 4) : [];

  return (
      <div className="bg-orange-50 text-[#2f2f2f] py-16 px-4 font-sans min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight mb-3">
              Today's <span className="text-orange-500">Special Offer's</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto">
              Savor the extraordinary with our chef-crafted culinary delights, curated just for you.
            </p>
          </div>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayList.map((item, i) => {
              const cartItem = cartItems.find(ci => ci.item?._id === item._id);
              const qty = cartItem?.quantity ?? 0;
              const cartId = cartItem?._id;

              return (
                  <div
                      key={item._id}
                      className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md flex flex-col transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
                      style={{ '--index': i }}
                  >
                    {/* Image */}
                    <div className="relative h-48 sm:h-56 md:h-60 flex items-center justify-center bg-gray-100">
                      <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain transition-all duration-700"
                      />
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full text-sm">
                    <span className="flex items-center gap-2 text-yellow-400 font-semibold">
                      <FaStar /> {item.rating}
                    </span>
                        <span className="flex items-center gap-2 text-red-400 font-semibold">
                      <FaHeart /> {item.hearts}
                    </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6 flex flex-col flex-grow">
                      <h3 className="text-xl sm:text-2xl mb-2 font-bold font-sans text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm mb-4 font-sans leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                      <div className="mt-auto flex items-center gap-4 justify-between">
                        <div className="bg-orange-100/50 px-3 py-1 rounded-2xl shadow-sm">
                      <span className="text-xl font-bold text-orange-500 font-sans">
                        ₹{Number(item.price).toFixed(2)}
                      </span>
                        </div>

                        {qty > 0 ? (
                            <div className="flex items-center gap-2">
                              <button
                                  onClick={() =>
                                      qty > 1 ? updateQuantity(cartId, qty - 1) : removeFromCart(cartId)
                                  }
                                  className="w-8 h-8 rounded-full bg-orange-500/80 flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                              >
                                <HiMinus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center text-gray-800 font-sans font-bold">
                          {qty}
                        </span>
                              <button
                                  onClick={() => updateQuantity(cartId, qty + 1)}
                                  className="w-8 h-8 rounded-full bg-orange-500/80 flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                              >
                                <HiPlus className="w-4 h-4" />
                              </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => addToCart(item, 1)}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-widest transition-transform duration-300 hover:scale-110 shadow-lg hover:shadow-orange-400/30"
                            >
                              Add to Cart
                            </button>
                        )}
                      </div>
                    </div>

                    {/* Floating Particles (if still desired, otherwise remove) */}
                    <FloatingParticle className="opacity-0 group-hover:opacity-100 absolute inset-0 pointer-events-none" />
                  </div>
              );
            })}
          </div>

          {/* Toggle Button */}
          <div className="mt-14 flex justify-center">
            <button
                onClick={() => setShowAll(!showAll)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-bold uppercase text-sm shadow-lg hover:scale-105 transition flex items-center gap-3"
            >
              <FaFire className="animate-pulse" />
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </div>
      </div>
  );
};

export default SpecialOffer;
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


                      {/* Nutrition info */}
{item.calories || item.protein || item.carbs || item.fat ? (
  <div className="text-sm text-amber-500 space-y-0.5 mb-3 font-mono">
    <div>Calories: {item.calories ?? 'N/A'} kcal</div>
    <div>Protein: {item.protein ?? 'N/A'} g</div>
    <div>Carbs: {item.carbs ?? 'N/A'} g</div>
    <div>Fat: {item.fat ?? 'N/A'} g</div>
  </div>
) : (
  <div className="text-gray-400 italic text-xs mb-3">Nutrition info not available</div>
)}

 {/* Veg/Non-Veg Info */}
  <div className={`text-xs font-semibold mb-2 px-2 py-1 w-fit rounded ${
    item.isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
  }`}>
    {item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
  </div>


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
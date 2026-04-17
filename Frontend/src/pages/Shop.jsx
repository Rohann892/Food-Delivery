import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import FoodCart from "../components/FoodCart";
import { FaMapMarkerAlt, FaStar, FaArrowLeft } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa";

const Shop = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetShop = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/item/get-by-shop/${shopId}`,
        {
          withCredentials: true,
        },
      );
      if (res.data.success) {
        setShop(res.data.shop);
        setItems(res.data.items);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetShop();
  }, [shopId]);

  if (loading) {
    return (
      <div className="w-screen min-h-screen flex justify-center items-center bg-[#fff9f6]">
        <div className="w-12 h-12 border-4 border-[#ff4d2d] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-[#fff9f6]">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Shop not found
        </h1>
        <p className="text-gray-500">
          The shop you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-[#fff9f6] flex flex-col items-center">
      {/* Banner Section */}
      <div className="w-full max-w-6xl mt-6 px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-[#ff4d2d] transition-colors font-semibold py-1 px-2 -ml-2 rounded-lg hover:bg-orange-50"
        >
          <FaArrowLeft />
          <span>Go Back</span>
        </button>
        <div className="relative w-full h-[250px] md:h-[350px] rounded-3xl overflow-hidden shadow-2xl group">
          <img
            src={
              shop.image ||
              "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80"
            }
            alt={shop.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="text-white transform transition duration-500 translate-y-0">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
                {shop.name}
              </h1>
              <div className="flex items-center gap-2 mt-3 opacity-90 bg-black/20 w-fit px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                <FaMapMarkerAlt className="text-[#ff4d2d]" size={16} />
                <p className="text-sm md:text-base font-medium">
                  {shop.address}, {shop.city}
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4 shadow-xl hover:bg-white/20 transition duration-300">
              <div className="bg-gradient-to-br from-[#ff7a55] to-[#ff4d2d] w-14 h-14 rounded-full flex justify-center items-center text-white shadow-lg">
                <FaStar size={24} />
              </div>
              <div className="text-white pr-2">
                <p className="font-black text-2xl leading-none">4.5</p>
                <p className="text-xs uppercase tracking-wider font-semibold opacity-90 mt-1">
                  Rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="w-full max-w-6xl mt-12 px-4 mb-20 flex-1">
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight flex gap-2">
            <FaUtensils size={25} className="text-red-500" /> Menu
          </h2>
          <span className="bg-[#ff4d2d]/10 text-[#ff4d2d] px-5 py-2 rounded-full font-bold text-sm shadow-sm border border-[#ff4d2d]/20">
            {items.length} Items Available
          </span>
        </div>

        {items.length > 0 ? (
          <div className="w-full h-auto flex flex-wrap gap-6 justify-center md:justify-start">
            {items.map((item, index) => (
              <div
                key={index}
                className="transform transition-all duration-300 hover:-translate-y-2"
              >
                <FoodCart data={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full py-24 flex flex-col items-center justify-center bg-white rounded-[2rem] shadow-sm border border-orange-50">
            <div className="bg-orange-50 p-6 rounded-full mb-6">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                alt="Empty"
                className="w-24 h-24 opacity-60"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No menu available
            </h3>
            <p className="text-gray-400">
              This shop hasn't added any items yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;

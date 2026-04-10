import React from "react";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../Redux/userSlice";

const CartItemCard = ({ data }) => {
  const dispatch = useDispatch();
  const handleIncrease = (id, currentQty) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  };
  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    }
  };
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow border">
      <div className="flex items-center gap-4">
        <img
          src={data.image}
          alt=""
          className="w-20 h-20 object-cover rounded-lg border"
        />
        <div>
          <h1 className="font-medium text-gray-800">{data.name}</h1>
          <p className="text-sm text-gray-500">
            ₹{data.price} * {data.quantity}
          </p>
          <p className="text-sm font-bold text-gray-900">
            ₹{data.price * data.quantity}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="p-2 cursor-pointer bg-gray-100 rounded-full hover:bg-gray-200"
          onClick={() => handleDecrease(data.id, data.quantity)}
        >
          <FaMinus />
        </button>
        <span className="text-semibold text-sm">{data.quantity}</span>
        <button
          className="p-2 cursor-pointer bg-gray-100 rounded-full hover:bg-gray-200"
          onClick={() => handleIncrease(data.id, data.quantity)}
        >
          <FaPlus />
        </button>
        <button
          className="p-2 cursor-pointer bg-gray-100 rounded-full hover:bg-gray-200"
          onClick={() => dispatch(removeFromCart(data.id))}
        >
          <FaTrashAlt className="text-[#ff4d2d]" />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;

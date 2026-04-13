import axios from "axios";
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

const OwnerOrderCard = ({ data }) => {
  const formatedData = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleUpdateStatus = async (orderId, shopId, status) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/order/update-status/${orderId}/${shopId}`,
        { status },
        {
          withCredentials: true,
        },
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div className="flex justify-between border-b pb-2">
        <div>
          <p className="font-semibold text-lg">Order #{data?._id?.slice(-6)}</p>
          <p className="text-sm text-gray-600">
            {formatedData(data?.createdAt)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            {data.paymentMethod?.toUpperCase()}
          </p>
          <p className="font-medium text-blue-500">
            {data.shopOrders && data.shopOrders[0]?.status}
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <h2 className="text-md font-semibold text-gray-800">
          Customer: {data.user?.fullName}
        </h2>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <FaPhoneAlt size={12} className="text-gray-400" /> {data.user?.mobile}
        </p>
      </div>

      <div className="text-sm text-gray-600 border-l-2 pl-2 border-gray-200">
        <p className="font-medium text-gray-700">Delivery Address</p>
        <p className="text-gray-500">{data.deliveryAddress?.text}</p>
      </div>

      {data.shopOrders &&
        data.shopOrders.map((shopOrder, index) => (
          <div
            key={index}
            className="border rounded-lg p-3 bg-[#fffaf7] space-y-3"
          >
            <div className="flex border-b border-gray-200 pb-2 mb-2 items-center justify-between">
              <span className="font-medium text-gray-700">Order Items</span>
              <span className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full">
                {shopOrder.status}
              </span>
            </div>

            <div className="flex overflow-x-auto pb-2 gap-3 snap-x">
              {shopOrder.shopOrderItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col shrink-0 w-[140px] border rounded-lg p-2 bg-white snap-start"
                >
                  <img
                    src={item.item?.image}
                    alt={item.name}
                    className="w-full h-24 object-cover rounded"
                  />
                  <p className="text-sm font-semibold mt-1 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-auto">
                    Qty: {item.quantity} x ₹{item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
        <span className="text-sm">
          Status:{" "}
          <span className="font-semibold capitalize">
            {data.shopOrders[0].status}
          </span>{" "}
        </span>
        <select
          className="rounded-md border px-3 py-1 text-sm focus:outline-none border-[#ff4d2d] text-[#ff4d2d]"
          defaultValue={data.shopOrders[0].status}
          onChange={(e) =>
            handleUpdateStatus(data._id, data.shopOrders[0]._id, e.target.value)
          }
        >
          <option>Change</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out for delivery">Out for Delivery</option>
        </select>
      </div>
      <div>Total: ₹{data.shopOrders[0].subtotal}</div>
    </div>
  );
};

export default OwnerOrderCard;

import React from "react";

const UserOrderCard = ({ data }) => {
  const formatedData = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "out for delivery":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalItems = data?.cartItems?.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-4 border-l-4 border-[#ff4d2d]">
      {/* Header */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="font-semibold text-lg">Order #{data?._id?.slice(-6)}</p>
          <p className="text-sm text-gray-600">
            {formatedData(data?.createdAt)}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(data?.status)}`}
        >
          {data?.status}
        </span>
      </div>

      {/* Order Items */}
      {data?.cartItems && data?.cartItems.length > 0 && (
        <div className="border-t pt-3">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Items ({totalItems})
          </p>
          <div className="space-y-1 max-h-[100px] overflow-y-auto">
            {data?.cartItems?.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between text-sm text-gray-600"
              >
                <span>
                  {item?.name || "Item"} x {item?.quantity || 1}
                </span>
                <span>₹{(item?.price * (item?.quantity || 1)).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delivery Address */}
      {data?.deliveryAddress && (
        <div className="border-t pt-3">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            Delivery Address
          </p>
          <p className="text-sm text-gray-600">
            {data?.deliveryAddress?.text || data?.deliveryAddress}
          </p>
        </div>
      )}

      {/* Total Amount */}
      <div className="border-t pt-3 flex justify-between items-center">
        <p className="font-semibold text-gray-800">Total Amount:</p>
        <p className="text-lg font-bold text-[#ff4d2d]">
          ₹{(data?.totalAmount || 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default UserOrderCard;

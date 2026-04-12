import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const AddFoodItem = () => {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [frontEndImage, setFrontendImage] = useState(myShopData?.image || null);
  const [backendImage, setBackendImage] = useState(null);
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("veg");
  const [loading, setLoading] = useState(false);

  const categories = [
    "Snacks",
    "Main course",
    "Desserts",
    "Pizza",
    "Burger",
    "South Indian",
    "North Indian",
    "Chinese",
    "Fast Food",
    "Others",
  ];

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate before setting loading
    if (!backendImage) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("foodType", foodType);
      formData.append("price", price);
      formData.append("image", backendImage);

      const res = await axios.post(
        `http://localhost:8000/api/item/add-item`,
        formData,
        { withCredentials: true, timeout: 60000 },
      );

      if (res.data.success) {
        alert("Item added successfully!");
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        console.log(
          "Server response error:",
          error.response.status,
          error.response.data,
        );
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        alert("Network error - no response from server");
      } else {
        alert(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen">
      {/* ✅ fixed: flex-col not "flex col" */}
      <div
        className="absolute top-[20px] left-[20px] z-[10] mb-[10px]"
        onClick={() => navigate("/")}
      >
        <IoArrowBack size={35} className="text-[#ff4d2d]" />
      </div>
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full mb-4">
            <FaUtensils className="text-[#ff4d2d] w-16 h-16" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">
            {myShopData ? "Edit Item" : "Add Item"}
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dish Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter dish name"
              className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Image
            </label>
            <input
              onChange={handleImage}
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {frontEndImage && (
              <div className="mt-4">
                <img
                  src={frontEndImage}
                  alt="Food preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-100"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter the price"
              className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Type
            </label>
            <select
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select Food Type</option>
              <option value="veg">Veg</option>
              <option value="non veg">Non Veg</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select Category</option>
              {categories.map((cate, index) => (
                <option value={cate} key={index}>
                  {cate}
                </option>
              ))}
            </select>
          </div>
          <button
            className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition-all duration-200 cursor-pointer"
            disabled={loading}
          >
            {loading ? <ClipLoader color="white" /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFoodItem;

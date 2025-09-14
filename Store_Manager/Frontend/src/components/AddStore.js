import React, { useState } from "react";

export default function AddStore({ toggleModal, fetchStoresData, authContext }) {
  const [storeData, setStoreData] = useState({
    name: "",
    category: "General",
    address: "",
    city: "",
    image: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreData({ ...storeData, [name]: value });
  };

  // Convert image to base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setStoreData({ ...storeData, image: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  // Submit store
  const addStore = () => {
    fetch("http://localhost:4000/api/store/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...storeData, userID: authContext.user }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Store Added!");
        fetchStoresData(); // Refresh store list
        toggleModal(); // Close modal
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Add Store</h3>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Store Name"
            value={storeData.name}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={storeData.category}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={storeData.address}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={storeData.city}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={toggleModal}
          >
            Cancel
          </button>
          <button
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            onClick={addStore}
          >
            Add Store
          </button>
        </div>
      </div>
    </div>
  );
}

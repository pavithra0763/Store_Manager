import React, { useState, useEffect, useContext } from "react";
import AddStore from "../components/AddStore";
import AuthContext from "../AuthContext";

function Store() {
  const [showModal, setShowModal] = useState(false);
  const [stores, setAllStores] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchStoresData();
  }, []);

  // Fetch all stores
  const fetchStoresData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((res) => res.json())
      .then((data) => setAllStores(data))
      .catch((err) => console.log(err));
  };

  // Toggle Add Store modal
  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12 border-2 p-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <span className="font-bold">Manage Store</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
            onClick={toggleModal}
          >
            Add Store
          </button>
        </div>

        {/* Add Store Modal */}
        {showModal && (
          <AddStore
            toggleModal={toggleModal}
            fetchStoresData={fetchStoresData}
            authContext={authContext}
          />
        )}

        {/* Stores List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((store) => (
            <div
              className="bg-white w-full h-fit flex flex-col gap-4 p-4 rounded shadow"
              key={store._id}
            >
              <img
                alt="store"
                className="h-60 w-full object-cover rounded"
                src={
                  store.image ||
                  "https://via.placeholder.com/400x240.png?text=No+Image"
                }
              />
              <div className="flex flex-col gap-3">
                <span className="font-bold text-lg">{store.name}</span>
                <div className="flex items-center gap-2">
                  <img
                    alt="location-icon"
                    className="h-6 w-6"
                    src={require("../assets/location-icon.png")}
                  />
                  <span className="text-gray-700">
                    {store.address}, {store.city}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">{store.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Store;

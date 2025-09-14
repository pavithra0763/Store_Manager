import React, { useState, useEffect, useContext } from "react";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import AuthContext from "../AuthContext";

function Inventory() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [products, setAllProducts] = useState([]);
  const [stores, setAllStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatePage, setUpdatePage] = useState(false);

  // New states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchProductsData();
    fetchStoresData();
  }, [updatePage]);

  const fetchProductsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`http://localhost:4000/api/product/get/${authContext.user}`);
      const data = await res.json();
      setAllProducts(data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchStoresData = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/store/get/${authContext.user}`);
      const data = await res.json();
      setAllStores(data);
    } catch (err) {
      console.error("Failed to load stores:", err);
    }
  };

  const fetchSearchData = async (term) => {
    if (!term) {
      fetchProductsData();
      return;
    }
    try {
      const res = await fetch(`http://localhost:4000/api/product/search?searchTerm=${term}`);
      const data = await res.json();
      setAllProducts(data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  // Debounce search: wait before sending API request
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm !== "") {
        fetchSearchData(searchTerm);
      } else {
        fetchProductsData();
      }
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const addProductModalSetting = () => setShowProductModal(!showProductModal);

  const updateProductModalSetting = (product) => {
    setUpdateProduct(product);
    setShowUpdateModal(!showUpdateModal);
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await fetch(`http://localhost:4000/api/product/delete/${id}`, { method: "DELETE" });
      setUpdatePage(!updatePage);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        {/* Summary Cards */}
        <div className="bg-white rounded p-3">
          <span className="font-semibold px-4">Overall Inventory</span>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="flex flex-col p-10 w-full md:w-3/12">
              <span className="font-semibold text-blue-600 text-base">
                Total Products
              </span>
              <span className="font-semibold text-gray-600 text-base">
                {products.length}
              </span>
              <span className="font-thin text-gray-400 text-xs">Last 7 days</span>
            </div>
            <div className="flex flex-col gap-3 p-10 w-full md:w-3/12 sm:border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-yellow-600 text-base">Stores</span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    {stores.length}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">Last 7 days</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">$2000</span>
                  <span className="font-thin text-gray-400 text-xs">Revenue</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10 w-full md:w-3/12 sm:border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-purple-600 text-base">Top Selling</span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">5</span>
                  <span className="font-thin text-gray-400 text-xs">Last 7 days</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">$1500</span>
                  <span className="font-thin text-gray-400 text-xs">Cost</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10 w-full md:w-3/12 border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-red-600 text-base">Low Stocks</span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">12</span>
                  <span className="font-thin text-gray-400 text-xs">Ordered</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">2</span>
                  <span className="font-thin text-gray-400 text-xs">Not in Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {showProductModal && (
          <AddProduct
            addProductModalSetting={addProductModalSetting}
            handlePageUpdate={() => setUpdatePage(!updatePage)}
          />
        )}
        {showUpdateModal && updateProduct && (
          <UpdateProduct
            updateProductData={updateProduct}
            updateModalSetting={updateProductModalSetting}
          />
        )}

        {/* Products Table */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center">
              <span className="font-bold">Products</span>
              <div className="flex justify-center items-center px-2 border-2 rounded-md">
                <img
                  alt="search-icon"
                  className="w-5 h-5"
                  src={require("../assets/search-icon.png")}
                />
                <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
              onClick={addProductModalSetting}
            >
              Add Product
            </button>
          </div>

          {loading && <p className="p-4 text-gray-500">Loading products...</p>}
          {error && <p className="p-4 text-red-600">{error}</p>}

          {!loading && !error && (
            <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-900">Products</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-900">Manufacturer</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-900">Stock</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-900">Description</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-900">Availability</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-900">More</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-4 py-2 text-gray-900">{product.name}</td>
                    <td className="px-4 py-2 text-gray-700">{product.manufacturer}</td>
                    <td className="px-4 py-2 text-gray-700">{product.stock}</td>
                    <td className="px-4 py-2 text-gray-700">{product.description}</td>
                    <td className="px-4 py-2 text-gray-700">
                      {product.stock > 0 ? "In Stock" : "Not in Stock"}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => updateProductModalSetting(product)}
                      >
                        Edit
                      </span>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => deleteItem(product._id)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Inventory;

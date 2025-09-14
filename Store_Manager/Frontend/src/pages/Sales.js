import React, { useState, useEffect, useContext } from "react";
import AddSale from "../components/AddSale";
import AuthContext from "../AuthContext";

function Sales() {
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [sales, setAllSalesData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [stores, setAllStores] = useState([]);
  const [updatePage, setUpdatePage] = useState(false);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchSalesData();
    fetchProductsData();
    fetchStoresData();
  }, [updatePage]);

  // Fetch all sales
  const fetchSalesData = () => {
    fetch(`http://localhost:4000/api/sales/get/${authContext.user}`)
      .then((res) => res.json())
      .then((data) => setAllSalesData(data))
      .catch((err) => console.log(err));
  };

  // Fetch all products
  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((err) => console.log(err));
  };

  // Fetch all stores
  const fetchStoresData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((res) => res.json())
      .then((data) => setAllStores(data))
      .catch((err) => console.log(err));
  };

  // Toggle Add Sale modal
  const addSaleModalSetting = () => setShowSaleModal(!showSaleModal);

  // Refresh page data
  const handlePageUpdate = () => setUpdatePage(!updatePage);

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        {/* Modal */}
        {showSaleModal && (
          <AddSale
            addSaleModalSetting={addSaleModalSetting}
            products={products}
            stores={stores}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}

        {/* Sales Table */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <span className="font-bold">Sales</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
              onClick={addSaleModalSetting}
            >
              Add Sale
            </button>
          </div>

          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Product Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Store Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Stock Sold
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Sales Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Total Sale Amount
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {sales.map((sale) => (
                <tr key={sale._id}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                    {sale.ProductID?.name || "N/A"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {sale.StoreID?.name || "N/A"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {sale.StockSold}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {new Date(sale.SaleDate).toLocaleDateString() ===
                    new Date().toLocaleDateString()
                      ? "Today"
                      : new Date(sale.SaleDate).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${sale.TotalSaleAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Sales;

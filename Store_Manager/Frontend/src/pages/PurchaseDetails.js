import React, { useState, useEffect, useContext } from "react";
import AddPurchaseDetails from "../components/AddPurchaseDetails";
import AuthContext from "../AuthContext";

function PurchaseDetails() {
  const [showPurchaseModal, setPurchaseModal] = useState(false);
  const [purchase, setAllPurchaseData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [updatePage, setUpdatePage] = useState(false);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchPurchaseData();
    fetchProductsData();
  }, [updatePage]);

  // Fetch all purchase data for the user
  const fetchPurchaseData = () => {
    fetch(`http://localhost:4000/api/purchase/get/${authContext.user}`)
      .then((res) => res.json())
      .then((data) => setAllPurchaseData(data))
      .catch((err) => console.log(err));
  };

  // Fetch all products for the user
  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((err) => console.log(err));
  };

  // Toggle modal visibility
  const addPurchaseModalSetting = () => setPurchaseModal(!showPurchaseModal);

  // Trigger page refresh
  const handlePageUpdate = () => setUpdatePage(!updatePage);

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        {/* Modal for Adding Purchase */}
        {showPurchaseModal && (
          <AddPurchaseDetails
            addSaleModalSetting={addPurchaseModalSetting}
            products={products}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}

        {/* Purchase Table */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <span className="font-bold">Purchase Details</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
              onClick={addPurchaseModalSetting}
            >
              Add Purchase
            </button>
          </div>

          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Product Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Quantity Purchased
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Purchase Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Total Purchase Amount
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {purchase.map((item) => (
                <tr key={item._id}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                    {item.ProductID?.name || "N/A"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.QuantityPurchased}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {new Date(item.PurchaseDate).toLocaleDateString() ===
                    new Date().toLocaleDateString()
                      ? "Today"
                      : new Date(item.PurchaseDate).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${item.TotalPurchaseAmount}
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

export default PurchaseDetails;

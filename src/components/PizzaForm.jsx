import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "./Redux/actions";

const PizzaForm = () => {
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [base, setBase] = useState("");
  const [error, setError] = useState(""); // State to manage form validation error
  const dispatch = useDispatch();
  const ordersInProgress = useSelector((state) => state.ordersInProgress);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type.trim() || !size.trim() || !base.trim()) {
      setError("All fields are required"); // Set error message if any field is empty
    } else if (ordersInProgress.length >= 10) {
      setError("Not taking any more orders for now"); // Display an alert if the maximum limit is reached
    } else {
      dispatch(placeOrder({ type, size, base }));
      setType("");
      setSize("");
      setBase("");
      setError(""); // Clear error message upon successful submission
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mt-3 text-start">
        Place Pizza Order
      </h1>
      <form className="mt-5 lg:flex  xl:flex  gap-5 ">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Type</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Size</option>
          <option value="Large">Large</option>
          <option value="Medium">Medium</option>
          <option value="Small">Small</option>
        </select>
        <select
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Base</option>
          <option value="Thin">Thin</option>
          <option value="Thick">Thick</option>
        </select>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message */}
      <button
        type="submit"
        className="bg-green-700 p-2 w-full mt-3 text-white rounded-sm"
        onClick={handleSubmit}
      >
        Place Order
      </button>
      {ordersInProgress.length >= 10 && (
        <p className="text-red-500 mt-5">Not taking any order for now</p>
      )}
    </div>
  );
};

export default PizzaForm;

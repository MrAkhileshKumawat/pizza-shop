// Pizzastages.js

import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveToNextStage ,updateTimeTaken} from "./Redux/actions";

function PizzaStages() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const [stageTimes, setStageTimes] = useState({});
  
  const calculateTimeSpent = (order) => {
    if (!stageTimes[order.id]) {
      return { minutes: 0, seconds: 0 };
    }
    const currentTime = new Date();
    const stageStartTime = new Date(stageTimes[order.id]);
    const timeDiff = Math.abs(currentTime - stageStartTime);
    const minutesSpent = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsSpent = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return { minutes: minutesSpent, seconds: secondsSpent };
  };

  const handleNextStage = (orderId) => {
    const currentOrder = data.ordersInProgress.find(
      (order) => order.id === orderId
    );
    let nextStage;
    switch (currentOrder.stage) {
      case "Order Placed":
        nextStage = "Order In Making";
        break;
      case "Order In Making":
        nextStage = "Order Ready";
        break;
      case "Order Ready":
        nextStage = "Order Picked";
        break;
      case "Order Picked":
        nextStage = "Order Picked";
        break;
      default:
        nextStage = currentOrder.stage;
    }
    const timeTaken = calculateTimeSpent(currentOrder);
    dispatch(updateTimeTaken(orderId, timeTaken)); // Dispatch the new action
    dispatch(moveToNextStage(orderId, nextStage));
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      setStageTimes((prevTimes) => {
        const updatedTimes = { ...prevTimes };
        data.ordersInProgress.forEach((order) => {
          updatedTimes[order.id] = updatedTimes[order.id] || new Date();
        });
        return updatedTimes;
      });
    }, 1000); // Update stage time every second

    return () => clearInterval(interval);
  }, [data.ordersInProgress]);

  // Function to calculate time based on pizza size
// Function to calculate time based on pizza size
const calculateMakingTime = (size) => {
  switch (size) {
    case "Small":
      return 3; // Time taken for small pizza (3 minutes)
    case "Medium":
      return 4; // Time taken for medium pizza (4 minutes)
    case "Large":
      return 5; // Time taken for large pizza (5 minutes)
    default:
      return 3; // Default to small pizza time if size is not specified
  }
};


  return (
    <>
      <h1 className="text-start font-semibold mt-3">Pizza Stages Section</h1>

      <div className=" flex justify-center gap-2 mt-5 flex-wrap">
        {/* Render stages */}
        {/* Order Placed */}
        <div className="w-64 h-96 border-slate-950 border-2 overflow-y-scroll">
          <p className="text-center p-2 font-semibold">Order Placed</p>
          {data.ordersInProgress && data.ordersInProgress.length > 0 ? (
            
            data.ordersInProgress.map((order) =>
              order.stage === "Order Placed" ? (
                <div
                  className={`w-40 h-24 p-1 border-slate-950 border-2 rounded-md text-center m-auto mt-5 bg-purple-400 text-white ${
                    calculateTimeSpent(order).minutes >=calculateMakingTime(order.size)  ? "bg-red-500" : ""
                  }`}
                  key={order.id}
                >
                  <p>{order.id}</p>
                  <p>
                    {calculateTimeSpent(order).minutes} Min{" "}
                    {calculateTimeSpent(order).seconds} Sec
                  </p>
                  <button
                    onClick={() => handleNextStage(order.id)}
                    type="button"
                    className="focus:outline-none text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1 mt-1.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Next Stage
                  </button>
                </div>
              ) : (
                ""
              )
            )
          ) : (
            <p>Order Not Placed</p>
          )}
        </div>
        
        {/* Other stages */}
        {/* Order In Making */}
       {/* Other stages */}
{/* Order In Making */}
<div className="w-64 h-96 border-slate-950 border-2 overflow-y-scroll">
  <p className="text-center p-2 font-semibold">Order In Making</p>
  {data.ordersInProgress && data.ordersInProgress.length > 0 ? (
    data.ordersInProgress.map((order) => {
      if (order.stage === "Order In Making") {
        return (
          <div
            className={`w-40 h-24 p-1 border-slate-950 border-2 rounded-md text-center m-auto mt-5 ${
              calculateTimeSpent(order).minutes >= calculateMakingTime(order.size) ? "bg-red-500" : ""
            } bg-blue-500 text-white`}
            key={order.id}
          >
            <p>{order.id}</p>
            <p>
              {calculateTimeSpent(order).minutes} Min{" "}
              {calculateTimeSpent(order).seconds} Sec
            </p>
            <button
              onClick={() => handleNextStage(order.id)}
              type="button"
              className="focus:outline-none text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1 mt-1.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Next Stage
            </button>
          </div>
        );
      } else {
        return null;
      }
    })
  ) : (
    <p></p>
  )}
</div>


        {/* Order Ready */}
      {/* Order Ready */}
<div className="w-64 h-96 border-slate-950 border-2 overflow-y-scroll">
  <p className="text-center p-2 font-semibold">Order Ready</p>
  {data.ordersInProgress && data.ordersInProgress.length > 0 ? (
    data.ordersInProgress.map((order) => {
      if (order.stage === "Order Ready") {
        return (
          <div
            className={`w-40 h-24 p-1 border-slate-950 border-2 rounded-md text-center m-auto mt-5 ${
              calculateTimeSpent(order).minutes >= calculateMakingTime(order.size) ? "bg-red-500" : ""
            } bg-yellow-500`}
            key={order.id}
          >
            <p>{order.id}</p>
            <p>
              {calculateTimeSpent(order).minutes} Min{" "}
              {calculateTimeSpent(order).seconds} Sec
            </p>
            <button
              onClick={() => handleNextStage(order.id)}
              type="button"
              className="focus:outline-none text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1 mt-1.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Next Stage
            </button>
          </div>
        );
      } else {
        return null;
      }
    })
  ) : (
    <p></p>
  )}
</div>

        
{/* Order Picked */}
<div className="w-64 h-96 border-slate-950 border-2 overflow-y-scroll">
  <p className="text-center p-2 font-semibold">Order Picked</p>
  {data.ordersInProgress && data.ordersInProgress.length > 0 ? (
    data.ordersInProgress.map((order) => {
      if (order.stage === "Order Picked") {
        return (
          <div
            className={`w-40 h-24 p-1 border-slate-950 border-2 rounded-md text-center m-auto mt-5 ${
              calculateTimeSpent(order).minutes >= calculateMakingTime(order.size) ? "bg-red-500" : ""
            } bg-green-800 text-white`}
            key={order.id}
          >
            <p>{order.id}</p>
            <button
              // onClick={() => handleNextStage(order.id)}
              type="button"
              className="focus:outline-none text-white focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-1 mt-1.5 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 cursor-default"
            >
              Order Picked
            </button>
          </div>
        );
      } else {
        return null;
      }
    })
  ) : (
    <p></p>
  )}
</div>
      </div>
    </>
  );
}

export default PizzaStages;

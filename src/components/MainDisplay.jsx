import React from "react";
import { useSelector } from "react-redux";
import "../components/MainDisplay.css";

function MainDisplay() {
  const ordersInProgress = useSelector((state) => state.ordersInProgress);
  const timeTaken = useSelector((state) => state.timeTaken);

  // Function to calculate total time for a specific order
  const calculateTimeForOrder = (orderId) => {
    const orderTimeData = timeTaken[orderId];
    if (orderTimeData) {
      const { minutes, seconds } = orderTimeData;
      return `${minutes} minutes ${seconds} seconds`;
    } else {
      return "NA";
    }
  };

  // Function to calculate total time
  const calculateTotalTime = () => {
    let totalTime = 0;
    for (const orderId in timeTaken) {
      const orderTimeData = timeTaken[orderId];
      totalTime += orderTimeData.minutes * 60 + orderTimeData.seconds;
    }
    const totalMinutes = Math.floor(totalTime / 60);
    const totalSeconds = totalTime % 60;
    return `${totalMinutes} minutes ${totalSeconds} seconds`;
  };

  return (
    <>
      <h3 className="text-start mt-5 font-semibold">Main Section</h3>
      <table className="mt-5">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Stage</th>
            <th>Total time spent (time from order placed)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ordersInProgress.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.stage}</td>
              <td>{calculateTimeForOrder(order.id)}</td>
              <td>
                {order.stage !== "Order Ready" &&
                order.stage !== "Order Picked" ? (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="bg-red-500 text-white p-2 rounded-sm px-5"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    className="bg-red-500 text-white p-2 rounded-sm px-5"
                    onClick={() => {
                      alert(
                        "Your order has been picked. Unfortunately, we are unable to cancel it at this time. "
                      );
                    }}
                  >
                    Order Picked
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td style={{ width: "15.4%" }}>
              <strong>Total order delivered</strong>
            </td>
            <td>
              {
                ordersInProgress.filter(
                  (order) => order.stage === "Order Picked"
                ).length
              }
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default MainDisplay;

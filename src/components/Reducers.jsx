// reducers.js

import {
  PLACE_ORDER,
  MOVE_TO_NEXT_STAGE,
  CANCEL_ORDER,
  UPDATE_STAGE,
  UPDATE_TIME_TAKEN, // Import UPDATE_TIME_TAKEN
} from "./actions";

const initialState = {
  ordersInProgress: [],
  timeTaken: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER:
      return {
        ...state,
        ordersInProgress: [
          ...state.ordersInProgress,
          { ...action.payload, stage: "Order Placed", id: Date.now() },
        ],
      };
    case MOVE_TO_NEXT_STAGE:
      return {
        ...state,
        ordersInProgress: state.ordersInProgress.map((order) =>
          order.id === action.payload.orderId
            ? { ...order, stage: action.payload.newStage }
            : order
        ),
      };
    case CANCEL_ORDER:
      return {
        ...state,
        ordersInProgress: state.ordersInProgress.filter(
          (order) => order.id !== action.payload
        ),
      };
    case UPDATE_STAGE:
      const { orderId, newStage } = action.payload;
      return {
        ...state,
        ordersInProgress: state.ordersInProgress.map((order) =>
          order.id === orderId ? { ...order, stage: newStage } : order
        ),
      };
      case UPDATE_TIME_TAKEN: {
        const { orderId, time } = action.payload; // Declaration moved here, wrapped with curly braces
        return {
          ...state,
          timeTaken: {
            ...state.timeTaken,
            [orderId]: time,
          },
        };
      }
    default:
      return state;
  }
};

export default reducer;

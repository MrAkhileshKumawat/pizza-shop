// actions.js

export const PLACE_ORDER = "PLACE_ORDER";
export const MOVE_TO_NEXT_STAGE = "MOVE_TO_NEXT_STAGE";
export const CANCEL_ORDER = "CANCEL_ORDER";
export const UPDATE_STAGE = "UPDATE_STAGE";
export const UPDATE_TIME_TAKEN = "UPDATE_TIME_TAKEN"; // Define the action type

export const placeOrder = (order) => ({
  type: PLACE_ORDER,
  payload: order,
});

export const moveToNextStage = (orderId, newStage) => ({
  type: MOVE_TO_NEXT_STAGE,
  payload: { orderId, newStage },
});

export const cancelOrder = (orderId) => ({
  type: CANCEL_ORDER,
  payload: orderId,
});

export const updateStage = (orderId, newStage) => ({
  type: UPDATE_STAGE,
  payload: { orderId, newStage },
});

export const updateTimeTaken = (orderId, time) => ({  // Define the updateTimeTaken action creator
  type: UPDATE_TIME_TAKEN,
  payload: { orderId, time },
});

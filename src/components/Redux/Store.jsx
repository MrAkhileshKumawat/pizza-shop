// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Reducers'; // Assuming you have combined your reducers into rootReducer

const store = configureStore({
  reducer: rootReducer,
    // Optionally, you can configure middleware, devtools, etc. here



});

export default store;

import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from "./rootReducer";

// Store instance
let store = null;
let persistor = null;
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["blogsReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
/**
 * Create the Redux store
 */
export const configureStore = () => {
  store = createStore(persistedReducer);
  const dispatch = (...args) => store.dispatch(...args);
  persistor = persistStore(store);
  return { store, persistor, dispatch };
};
/**
 * Get store
 */
export const getStore = () => store;
/**
 * Get persistor
 */
export const getPersistor = () => persistor;
/**
 * Dispatch an action
 */
export const dispatch = (...args) => store.dispatch(...args);
export default {
  dispatch,
  getStore,
  configureStore,
  persistor,
};

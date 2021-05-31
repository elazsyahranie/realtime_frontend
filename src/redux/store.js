import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import promisedMiddleware from "redux-promise-middleware";
import rootReducer from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// import rootReducer from "./reducer"; // ./reducer/index.js

let store = createStore(
  persistedReducer,
  applyMiddleware(promisedMiddleware, logger)
);
let persistor = persistStore(store);
export { store, persistor };
// export default createStore(
//   rootReducer,
//   applyMiddleware(promiseMiddleware, logger)
// );

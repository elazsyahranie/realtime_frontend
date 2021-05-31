import { combineReducers } from "redux";

import counter from "./counter";
import auth from "./auth";
import roomchat from "./roomchat";

// kalau mau export apa-apa di react ya kayak gini
export default combineReducers({
  counter,
  auth,
  roomchat,
});

import { legacy_createStore as createStore, combineReducers } from "redux";
import textReducer from "./reducers/textReducer";
import inputReducer from "./reducers/inputReducer";
import inputTaskReducer from "./reducers/inputTaskReducer";

const rootReducer = combineReducers({
  text: textReducer,
  input: inputReducer,
  inputTask: inputTaskReducer,
});

const store = createStore(rootReducer);

export default store;

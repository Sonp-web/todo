import { legacy_createStore as createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import textReducer from "./reducers/textReducer";
import inputReducer from "./reducers/inputReducer";
import inputTaskReducer from "./reducers/inputTaskReducer";

const rootReducer = combineReducers({
  text: textReducer,
  input: inputReducer,
  inputTask: inputTaskReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;

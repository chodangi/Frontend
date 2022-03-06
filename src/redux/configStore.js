import { createStore, combineReducers } from "redux";

import counter2 from "./modules/board";


const rootReducer = combineReducers(counter2);

const store = createStore(rootReducer);

export default store;


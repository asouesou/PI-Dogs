import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import DogReducer from "./reducer";

//creamos un reducer principal que combina todos los reducer que realicemos
//en este caso solo tenemos un reducer
const mainReducer = combineReducers({ dogs: DogReducer });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	mainReducer,
	composeEnhancers(applyMiddleware(thunk))
);

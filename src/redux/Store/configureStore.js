import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "../Reducer/MainReducer";
import sagas from "../Saga/Sagas";
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);
sagaMiddleware.run(sagas);
export { store };

export default store;

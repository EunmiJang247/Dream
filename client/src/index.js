import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

//app에 redux연결시켜주기위해.
import Reducer from './_reducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'

import { BrowserRouter } from 'react-router-dom'

//미들웨어를 이용해야 객체뿐만아니라 function, promise도받게하기위해설정
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider
      store={createStoreWithMiddleware(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

reportWebVitals()

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// //app에 redux연결시켜주기위해.
// import Reducer from "./_reducers";
// import { Provider } from "react-redux";
// import { createStore, applyMiddleware, compose } from "redux";
// import promiseMiddleware from "redux-promise";
// import ReduxThunk from "redux-thunk";
// import { PersistGate } from "redux-persist/integration/react";

// import { BrowserRouter } from "react-router-dom";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// //미들웨어를 이용해야 객체뿐만아니라 function, promise도받게하기위해설정
// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persisted = persistReducer(persistConfig, Reducer);

// const store = createStore(
//   persisted,
//   compose(
//     applyMiddleware(promiseMiddleware, ReduxThunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

// // const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)

// const root = ReactDOM.createRoot(document.getElementById("root"));

// const persistor = persistStore(store);

// root.render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </PersistGate>
//   </Provider>
// );

// reportWebVitals();

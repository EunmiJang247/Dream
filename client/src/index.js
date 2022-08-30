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
  // <React.StrictMode>
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
  // </React.StrictMode>
)

reportWebVitals()

//----------------------------------------------------------------------------리덕스 펄시스턴스 적용해보는 코드

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { createStore, applyMiddleware, compose } from 'redux'
// import Reducer from './_reducers'
// import promiseMiddleware from 'redux-promise'
// import ReduxThunk from 'redux-thunk'

// import { Provider } from 'react-redux'
// import { persistStore } from 'redux-persist'
// import { PersistGate } from 'redux-persist/integration/react'
// import App from './App'
// import configureStore from './store'
// import { rootReducer } from './reducers'

// import { BrowserRouter } from 'react-router-dom'
// import './index.css'

// const store = createStore(rootReducer)
// const persistor = persistStore(store)

// //미들웨어를 이용해야 객체뿐만아니라 function, promise도받게하기위해설정
// const createStoreWithMiddleware = applyMiddleware(
//   promiseMiddleware,
//   ReduxThunk
// )(createStore)

// const Root = () => (
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <App />
//     </PersistGate>
//   </Provider>
// )

// ReactDOM.render(<Root />, document.getElementById('root'))

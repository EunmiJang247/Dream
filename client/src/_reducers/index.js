import { combineReducers } from 'redux'
import user from './user'
import project from './project'
const rootReducer = combineReducers({
  user,
  project
})

export default rootReducer

// //리덕스 펄시스턴스 적용해보는 코드
// import { combineReducers } from 'redux'
// import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// import user from './user'
// import project from './project'

// const persistConfig = {
//   key: 'root',
//   // localStorage에 저장합니다.
//   storage,
//   // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
//   whitelist: ['user']
//   // blacklist -> 그것만 제외합니다
// }

// export const rootReducer = combineReducers({
//   user,
//   project
// })

// export default persistReducer(persistConfig, rootReducer)

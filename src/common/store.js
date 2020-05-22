import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { createStore, compose, applyMiddleware } from 'redux'
import commonReducers from './redux/reducers/common'
import { MODULE_REDUCERS } from '../modules'
import createSaga from './middlewares/saga'
import storage from 'redux-persist/lib/storage'
import sessionReducers from './redux/reducers/session'
import currencyReducers from './redux/reducers/currency'
import { getCookie } from './utils/cookie'
import { defaultState } from '../modules/LoginAndRegister/reducers'
import { persistCombineReducers, persistStore } from 'redux-persist'
import { createMultilanguageReducer } from 'redux-multilanguage'
import { loadingBarReducer } from 'react-redux-loading-bar'

export const history = createBrowserHistory();

const config = {
  key: "shop",
  storage,
  blacklist: ['session', 'compiler', 'loadingBar', 'user', 'cart']
}
const createMiddlewares = sagaMiddleware => {
  const middlewares = []

  // Saga Middleware
  if (sagaMiddleware) {
    middlewares.push(sagaMiddleware);
  }

  return applyMiddleware.apply({}, middlewares);
};

function mapCookieToStorage() {
  let initialState;
  try {
    const user = JSON.parse(getCookie("user"));
    initialState = {
      user: {
        user: user,
        refreshToken: getCookie('refreshToken'),
        token: getCookie('token'),
      }
    }
    // const storage = JSON.parse(window.localStorage.getItem('persist:root'))
    // const userStorage = storage && storage.user
    //   ? JSON.parse(storage.user)
    //   : defaultState
    // userStorage.token = getCookie('token')
    // userStorage.exp = getCookie('exp')

    // userStorage.userTypeId = user.user_type_id
    // userStorage.user = user
    // storage.user = JSON.stringify(userStorage)
    // window.localStorage.setItem('persist:shop', JSON.stringify(storage))
  } catch (err) {
    // console.log('err', err)
    initialState = undefined;
  }
  return initialState;
}

const createReducers = (reducers) => {
  return persistCombineReducers(config, {
    loadingBar: loadingBarReducer,
    multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
    common: commonReducers,
    session: sessionReducers,
    currencyData: currencyReducers,
    ...MODULE_REDUCERS,
    ...reducers,
  });
};
const composeEnhancers =
  process.env.NODE_ENV !== "production"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const buildStore = (reducers) => {
  const initialState = mapCookieToStorage();
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    createReducers(reducers),
    initialState,
    composeEnhancers(createMiddlewares(sagaMiddleware))
  );

  const persistor = persistStore(store);
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(createReducers(reducers));
    });
  }

  store.reducers = createReducers(reducers);
  sagaMiddleware.run(createSaga(store.getState));
  return { persistor, store };
};

export default buildStore();

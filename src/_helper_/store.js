import {createStore,applyMiddleware,combineReducers} from 'redux';
import config from './config'
import thunk from 'redux-thunk';


const rootReducer=combineReducers({
    contact : config,
  });
const store=createStore(rootReducer,applyMiddleware(thunk))

export default store;
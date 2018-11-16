import { combineReducers } from 'redux';

import authReducer from './auth.reducer';
import boardsReducer from './dashboard.reducer';
import listsReducer from './lists.reducer';


const rootReducer = combineReducers({
  authReducer,
  boardsReducer,
  listsReducer,
});


export default rootReducer;

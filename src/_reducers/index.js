import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { search } from './search.reducer';
import { alert } from './alert.reducer';



const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  search
});

export default rootReducer;
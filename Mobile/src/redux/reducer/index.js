// Imports: Dependencies
import { combineReducers } from 'redux';
import userReducer from './userReducer';

// Imports: Reducers


// Redux: Root Reducer
const rootReducer = combineReducers({
    userReducer : userReducer
   
});

// Exports
export default rootReducer;
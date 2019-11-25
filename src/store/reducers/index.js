import {
 combineReducers
} from 'redux';
import contextReducer from './text'

export default combineReducers({
    context : contextReducer
});
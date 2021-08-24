import {combineReducers} from 'redux';
import albumReducer from './albumReducer';
import artistReducer from './artistReducer';
import genresReducer from './genresReducer';
import playReducer from './playReducer';
import songReducer from './songReducer';
import searchReducer from './searchReducer';
import userReducer from './userReducer';
const appReducer = combineReducers({
    albumReducer,
    artistReducer,
    genresReducer,
    playReducer,
    songReducer,
    searchReducer,
    userReducer
})

export default appReducer;
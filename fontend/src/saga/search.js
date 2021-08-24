import {call, put} from "redux-saga/effects";
import {changeSearch} from "../redux/searchReducer"
export function* changeSearchSaga({payload}){
    yield put(changeSearch(payload));
}
import { call, put } from "redux-saga/effects";
import { saveAndEditUser } 
        from '../api/userApi'
import {saveUserFailed,saveUserSuccessfully} from '../redux/userReducer'
export function* saveAndEditUserSaga({payload}){
    try {
        const res = yield call(saveAndEditUser,payload);
        yield put(saveUserSuccessfully(res.data));
    } catch (error) {
        yield put(saveUserFailed(error.response))
    }
}
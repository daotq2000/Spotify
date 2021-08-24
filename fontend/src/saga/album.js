import {call, put} from "redux-saga/effects";
import {getAlbumById, paginationAlbum,saveAlbum,deleteAlbumList} from '../api/albumApi'
import {
    getAlbumByIdFailed,
    getAlbumByIdSuccess,
    paginationAlbumFailed,
    paginationAlbumSuccess,
    createNewAlbumSuccessFully,
    createNewAlbumFailed,
    deleteAlbumFailed,
    deleteAlbumSuccessFully
} from "../redux/albumReducer";

export function* paginationAlbumSaga({ payload }) {
    try {
        const res = yield call(paginationAlbum, payload);
        yield put(paginationAlbumSuccess(res.data));
    } catch (error) {
        yield put(paginationAlbumFailed(error));
    }
}
export function* getAlbumByIdSaga({ payload}){
    try {
        const res = yield call(getAlbumById, payload)
        yield put(getAlbumByIdSuccess(res.data));
    }catch (error) {
        yield put(getAlbumByIdFailed(error));
    }
}
export function* saveAlbumSaga({ payload}){
    
    try {
        const res = yield call(saveAlbum, payload)
        yield put(createNewAlbumSuccessFully(res.data));
    }catch (error) {
        yield put(createNewAlbumFailed(error));
    }
}
export function* deleteAlbumSaga({ payload}){
    try {
        const res = yield call(deleteAlbumList, payload)
        yield put(deleteAlbumSuccessFully(res));
    }catch (error) {
        yield put(deleteAlbumFailed(error));
    }
}
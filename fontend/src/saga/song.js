import { call, put } from "redux-saga/effects";
import { getSongById, getTop15BestSong, paginationSongs,saveSong,deleteListSong,updateTotalListen } 
        from '../api/songAPI'
import { getBestSongSuccess, getSongByIdFailed,getSongByIdSuccess,
        paginationSongFailed, paginationSongSuccessfully, 
        saveSongSuccessFully,saveSongFailed,
        deleteListSongFailed,deleteListSongSuccessFully} from "../redux/songReducer";
export function* paginationSongSaga({ payload }) {
    try {
        const res = yield call(paginationSongs, payload);
        yield put(paginationSongSuccessfully(res.data))
    } catch (e) {
        yield put(paginationSongFailed(e));
    }
}
export function* getBestSongSaga({ payload }) {
    try {
        let res = yield call(getTop15BestSong);
        yield put(getBestSongSuccess(res.data))
    } catch (error) {
    }
}
export function* getSongByIdSaga({ payload }) {
    try {
        const res = yield call(getSongById, payload);
        yield put(getSongByIdSuccess(res.data));
    } catch (error) {
        yield put(getSongByIdFailed(error.errors));
    }
}
export function* saveSongSaga({ payload }) {
    try {
        const res = yield call(saveSong, payload);
        yield put(saveSongSuccessFully(res.data));
    }catch(error) {
        yield put(saveSongFailed(error));

    }
}
export function* deleteListSongSaga({payload}){
    try{
        const res = yield call(deleteListSong, payload);
        yield put(deleteListSongSuccessFully(res.data));
    }catch(e){
        yield put(deleteListSongFailed(e));
    }
}
export function* updateTotalListenSaga({payload}){
    try {
        const res = yield call(updateTotalListen, payload);
    } catch (error) {
        
    }
}
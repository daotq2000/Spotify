import {call, put} from "redux-saga/effects";
import {paginationArtist,saveArtist,getArtistById,getAllSongByArtistId} from '../api/artistAPI'
import {paginationArtistFailed, paginationArtistSuccess,saveArtistFailed,
        saveArtistSuccessFully,getArtistByIdSuccessFully,getArtistByIdFailed,
        getAllSongByArtistIdSuccessFully,getAllSongByArtistIdFailed} 
        from "../redux/artistReducer";

export function* paginationArtistSaga({ payload }) {
    try {
        const res = yield call(paginationArtist, payload);
        yield put(paginationArtistSuccess(res.data));
    } catch (error) {
        yield put(paginationArtistFailed(error));
    }
}
export function* saveArtistSaga ({payload}){
    try{
        const res = yield call(saveArtist, payload);
        yield put(saveArtistSuccessFully(res.data));
    }catch(e){
        // yield put(saveArtistFailed(e));
    }
}
export function* getArtistByIdSaga ({payload}){
    try{
        const res = yield call(getArtistById, payload);
        yield put(getArtistByIdSuccessFully(res.data));
    }catch(e){
        yield put(getArtistByIdFailed(e));
    }
}
export function* getSongByArtistIdSaga({payload}){
    try{
        const res = yield call(getAllSongByArtistId, payload);
        yield put(getAllSongByArtistIdSuccessFully(res.data))
    }catch(e){
        yield put(getAllSongByArtistIdFailed(e))
    }
}
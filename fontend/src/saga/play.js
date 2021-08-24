import {call, put} from "redux-saga/effects";
import {getAlbumById} from '../api/albumApi'
import {controlPlayBarSuccess, getPlayListFailed, getPlayListSuccess} from "../redux/playReducer";

export function* getPlayListByAlbumIdSaga({ payload }) {
    try {
        const res = yield call(getAlbumById, payload);
        const arrayPlayList = res.data.albumSongs;
        if(arrayPlayList.length > 0){
            yield put(getPlayListSuccess(arrayPlayList));
        }
    } catch (error) {
        yield put(getPlayListFailed(error));
    }
}
export function* controlPlayBarSaga({ payload }) {
    try {
        yield put(controlPlayBarSuccess(payload));
    }catch (error) {
    }
}
export function* playSingleSongSaga({ payload }) {
    let playlist = [];
    try {
        if(payload.length == undefined){
            let songs = {songs: payload};
            playlist.push(songs);
        }else{
            playlist = payload;
        }
        if(playlist.length > 0){
            yield put(getPlayListSuccess(playlist));
        }
    }catch (error) {
    }
}

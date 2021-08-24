import {call, put} from "redux-saga/effects";
import {paginationGenresAPI,getAlbumAndSongByGenresId,getGenresById} from '../api/genresAPI'
import {paginationGenresFailed, paginationGenresSuccess,getAlbumAndSongByGenresIdSuccessfully,
        getAlbumAndSongByGenresIdFailed,getGenresByIdSuccess} from "../redux/genresReducer";

export function* paginationGenresSaga({ payload }) {
    try {
        const res = yield call(paginationGenresAPI, payload);
        yield put(paginationGenresSuccess(res.data));
    } catch (error) {
        yield put(paginationGenresFailed(error));
    }
}
export function* getAlbumAndSongByGenresIdSaga({ payload }) {
    try {
        const res = yield call(getAlbumAndSongByGenresId, payload);
        const response = yield call(getGenresById, payload.id);
        yield put(getAlbumAndSongByGenresIdSuccessfully(res.data));
        yield put(getGenresByIdSuccess(response.data));
    }catch (error) {
        yield put(getAlbumAndSongByGenresIdFailed(error));
    }
}
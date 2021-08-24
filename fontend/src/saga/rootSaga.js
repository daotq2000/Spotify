import {takeLatest} from 'redux-saga/effects';
import {getAlbumById, paginationAlbum,createNewAlbum,deleteAlbum} from '../redux/albumReducer'
import {getAlbumByIdSaga, paginationAlbumSaga,saveAlbumSaga,deleteAlbumSaga} from '../saga/album'
import {paginationArtist,saveArtist,getArtistById,getAllSongByArtistId} from '../redux/artistReducer'
import {paginationArtistSaga,saveArtistSaga,getArtistByIdSaga,getSongByArtistIdSaga} from '../saga/artist'
import {paginationGenres,getAlbumAndSongByGenresId} from '../redux/genresReducer'
import {paginationGenresSaga,getAlbumAndSongByGenresIdSaga} from '../saga/genres'
import {controlPlayBarSaga, getPlayListByAlbumIdSaga, 
        playSingleSongSaga} 
        from "../saga/play";
import {controlPlayBar, getPlayList, playSingleSong} from "../redux/playReducer";
import {getBestSong, getSongById,paginationSongs,
        saveSong,deleteListSong,updateTotalListen} 
        from "../redux/songReducer";
import {getBestSongSaga, getSongByIdSaga,paginationSongSaga,
        saveSongSaga,deleteListSongSaga,updateTotalListenSaga} 
        from '../saga/song'
import {search} from '../redux/searchReducer'
import {changeSearchSaga} from './search'
import {saveAndEditUserSaga} from '../saga/user'
import {saveUser} from '../redux/userReducer'
function* rootSaga() {
    //Album Saga
    yield takeLatest(paginationAlbum.type,paginationAlbumSaga);
    yield takeLatest(getAlbumById.type,getAlbumByIdSaga);
    yield takeLatest(createNewAlbum.type,saveAlbumSaga);
    yield takeLatest(deleteAlbum.type,deleteAlbumSaga);

    //Artist Saga
    yield takeLatest(paginationArtist.type,paginationArtistSaga);
    yield takeLatest(saveArtist.type,saveArtistSaga);
    yield takeLatest(getArtistById.type,getArtistByIdSaga);
    yield takeLatest(getAllSongByArtistId.type,getSongByArtistIdSaga);
    //Genres Saga
    yield takeLatest(paginationGenres.type,paginationGenresSaga);
    yield takeLatest(getAlbumAndSongByGenresId.type,getAlbumAndSongByGenresIdSaga);
    //Song Saga
    yield takeLatest(paginationSongs.type,paginationSongSaga);
    yield takeLatest(getBestSong.type,getBestSongSaga);
    yield takeLatest(getSongById.type,getSongByIdSaga);
    yield takeLatest(saveSong.type,saveSongSaga);
    yield takeLatest(deleteListSong.type,deleteListSongSaga);
    yield takeLatest(updateTotalListen.type,updateTotalListenSaga);
    //Play Saga
    yield takeLatest(playSingleSong.type,playSingleSongSaga);
    yield takeLatest(getPlayList.type,getPlayListByAlbumIdSaga);
    yield takeLatest(controlPlayBar.type,controlPlayBarSaga);
    //Search Saga
    yield takeLatest(search.type,changeSearchSaga);
    //User Saga
    yield takeLatest(saveUser.type,saveAndEditUserSaga)
}
export default rootSaga;
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    albums: [],
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    album: null,
    totalTime: 0
}
const albumReducer = createSlice({
    name: 'albumReducer',
    initialState,
    reducers: {
        paginationAlbum(state, payload) {
        },
        paginationAlbumSuccess(state, action) {
            const data = action.payload
            return { ...data }
        },
        paginationAlbumFailed(state, action) {
        },
        getAlbumById(state, action) {

        },
        getAlbumByIdSuccess(state, action) {
            let album = action.payload;
            let albumSongs = [];
            let totalTime = 0;
            let dataAlbumSong = action.payload.albumSongs;
            if (dataAlbumSong != null) {
                for (let i = 0; i < dataAlbumSong.length; i++) {
                    if (dataAlbumSong[i].songs != null) {
                        if (!isNaN(dataAlbumSong[i].songs.timePlay)) {
                            totalTime += dataAlbumSong[i].songs.timePlay;
                        }
                        albumSongs.push(dataAlbumSong[i].songs);
                    }
                }

            }
            album.totalTime = parseFloat(totalTime);
            album.albumSongs = albumSongs;
            return { ...state, album: album }
        },
        getAlbumByIdFailed(state, action) {

        },
        createNewAlbum(state, action) {

        },
        createNewAlbumSuccessFully(state, action) {
            let data = new Object();
            data.currentAlbum = action.payload;
            data.isSuccess = true;
            return { ...data, state }
        },
        createNewAlbumFailed(state, action) {

        },
        deleteAlbum(state, action) {

        }, 
        deleteAlbumSuccessFully(state, action) {
            return {...state,isDeleteSucess:true,isReset:true};
        },
        deleteAlbumFailed(state, action) {
            return {...state,isDeleteSucess:false,isReset:false};
        }

    }
})
export const
    { paginationAlbum, paginationAlbumSuccess, paginationAlbumFailed,
        getAlbumById, getAlbumByIdSuccess, getAlbumByIdFailed,
        createNewAlbum, createNewAlbumSuccessFully, createNewAlbumFailed,
        deleteAlbum, deleteAlbumSuccessFully, deleteAlbumFailed} = albumReducer.actions;
export default albumReducer.reducer;
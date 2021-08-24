import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    topSongs: [],
    song: null,
}
const songReducer = createSlice({
    name: 'songReducer',
    initialState,
    reducers: {
        paginationSongs(state, action) {

        },
        paginationSongSuccessfully(state, action) {
            let payload = action.payload;
            let data = { songs: payload.songs, currentPage: payload.currentPage, totalElements: payload.totalElements, totalPages: payload.totalPages }
            return { ...data };
        },
        paginationSongFailed(state, action) {

        },
        getBestSong(state, action) {

        },
        getBestSongSuccess(state, action) {
            let data = new Object();
            data.topSongs = action.payload
            return { ...data }
        },
        getBestSongFailed(state, action) {

        },
        getSongById(state, action) {
            
        },
        getSongByIdSuccess(state, action) {
            let data = action.payload;
            return {...state,currentSong:data}
        },
        getSongByIdFailed(state, action) {
             
        },
        saveSong(state, action) {

        },
        saveSongSuccessFully(state, action) {
            let data = new Object();
            data.currentSong = action.payload;
            data.isSuccess = true;
            return {...data,state};
        },
        saveSongFailed(state, action) {
            let data = {};
            data.isSuccess = false;
            return data;
        },
        deleteListSong(state,action){},
        deleteListSongSuccessFully(state,action){
            return {...state,isDeleteSucess:true,isReset:true};
        },
        deleteListSongFailed(state,action){
            return {...state,isDeleteSucess:true,isReset:false};
        },
        updateTotalListen(state,action){}

    }
})
export const
    { getBestSong, getBestSongSuccess, getBestSongFailed,
        getSongById, getSongByIdSuccess, getSongByIdFailed,
        paginationSongs, paginationSongSuccessfully, paginationSongFailed,
        saveSong, saveSongSuccessFully, saveSongFailed,
        deleteListSong,deleteListSongSuccessFully,deleteListSongFailed,updateTotalListen }
        = songReducer.actions;
export default songReducer.reducer;
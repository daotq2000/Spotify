import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    artists: [],
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
}
const artistReducer = createSlice({
    name: 'artistReducer',
    initialState,
    reducers: {
        paginationArtist(state, payload) {
        },
        paginationArtistSuccess(state, action) {
            const data = action.payload
            return { ...data }
        },
        paginationArtistFailed(state, action) {
        },
        saveArtist(state,action){},
        saveArtistSuccessFully(state,action){
            let data = action.payload;
            return {...state,currentArtist:data,isSuccess:true}
        },
        saveArtistFailed(state,action){
            
        },
        getArtistById(state,action){},
        getArtistByIdSuccessFully(state,action){
            let data = action.payload;
            return {...state,currentArtist:data}
        },
        getArtistByIdFailed(state,action){},
        getAllSongByArtistId(state,action){},
        getAllSongByArtistIdSuccessFully(state,action){
            let data = action.payload;
            return {...state,songs:data}
        },
        getAllSongByArtistIdFailed(state,action){},
    }
})
export const { paginationArtist, paginationArtistSuccess, paginationArtistFailed,
               saveArtist,saveArtistSuccessFully,saveArtistFailed,
               getArtistById,getArtistByIdSuccessFully,getArtistByIdFailed,
               getAllSongByArtistId,getAllSongByArtistIdSuccessFully,getAllSongByArtistIdFailed} = artistReducer.actions;
export default artistReducer.reducer;
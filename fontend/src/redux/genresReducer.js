import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    genres: [],
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
}
const genresReducer = createSlice({
    name: 'genresReducer',
    initialState,
    reducers: {
        paginationGenres(state, payload) {
        },
        paginationGenresSuccess(state, action) {
            const data = action.payload
            return { ...data }
        },
        paginationGenresFailed(state, action) {
        },
        getAlbumAndSongByGenresId(state, action) {

        }, getAlbumAndSongByGenresIdSuccessfully(state, action) {
            return { ...state, songAndAlbum: action.payload }
        }, getAlbumAndSongByGenresIdFailed(state, action) {

        },
        getGenresById(state, action) {

        }, getGenresByIdSuccess(state, action) {
            const data = action.payload
            return { ...state,currentGenres:data }
        },
        getGenresByIdFailed(state, action) {

        }
    }
})
export const { paginationGenres, paginationGenresSuccess, paginationGenresFailed,
    getAlbumAndSongByGenresId, getAlbumAndSongByGenresIdSuccessfully, getAlbumAndSongByGenresIdFailed,
    getGenresById,getGenresByIdSuccess,getGenresByIdFailed } = genresReducer.actions;
export default genresReducer.reducer;
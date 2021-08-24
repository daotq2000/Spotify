import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    search:''
}
const albumReducer = createSlice({
    name: 'albumReducer',
    initialState,
    reducers: {
        search(state,action){
            
        },
        changeSearch(state,action){
            return {...state,search:action.payload}
        }

    }
})
export const
    { search,changeSearch} = albumReducer.actions;
export default albumReducer.reducer;
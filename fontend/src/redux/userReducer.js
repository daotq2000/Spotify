import { createSlice } from '@reduxjs/toolkit'
import { useSnackbar } from 'notistack';
import reactDom from 'react-dom';
const initialState = {
    user: null
}
 
const userReducer = createSlice(
    {
        name: 'songReducer',
        initialState,
        reducers: {
            saveUser(state, action) { },
            saveUserSuccessfully(state, action) {
                let data = {user:action.payload,isSuccess:true,isReset:true};
                return data;
            },
            saveUserFailed(state, action) {
                let data = {user:action.payload,isSuccess:false};
                return data;
             },
        }
    });
export const
    { saveUser, saveUserSuccessfully, saveUserFailed } = userReducer.actions;
export default userReducer.reducer;

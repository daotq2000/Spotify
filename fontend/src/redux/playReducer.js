import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    playList: [],
    openBarPlay:false,
    isRepeat:false,
    isRandom:false,
    currentPlaySong:{},
}
const playReducer = createSlice({
    name:'playReducer',
    initialState,
    reducers:{
        getSong:{},
        getSongSuccess(state, action) {

        },
        getSongFailed(state, action){

        },
        getPlayList(state, action){

        },
        getPlayListSuccess(state, action){
            let arr = []
            let data = action.payload;
            for(let i = 0; i < data.length;i++){
                if(data[i].songs != null && data[i].songs != undefined){
                    arr.push(data[i].songs);
                }
            }
            let result = {};
            result.openBarPlay =true;
            result.playList = arr;
            result.isRepeat = false;
            result.isRandom = false;
            result.isPlay = true;
            result.isPause = false;
            return {...result}
        },
        getPlayListFailed(state,action){
            
        }, 
        controlPlayBar(){}, 
        controlPlayBarSuccess(state, action){
            const result = action.payload;
            result.isPlay = action.payload.control.isPlay;
            result.isPause = action.payload.control.pause;
            delete result.control;
            return result;
        }, 
        controlPlayBarFailed(state, action){

        },
        playSingleSong(state, action){

        }, 
        playSingleSongSuccessfully(state, action){
            const song = action.payload;
            return {...state,currentPlaySong:song,isSingle:true}
        }, 
        playSingleSongFailed(state, action){

        },
        playPlayListSong(state, action){},
        playPlayListSongSuccessfully(state, action){},
        playPlayListSongFailed(state, action){},
    }
})
export const 
    {getSong,getSongSuccess, getSongFailed,
    getPlayList,getPlayListSuccess,getPlayListFailed,
    controlPlayBar,controlPlayBarSuccess,controlPlayBarFailed,
    playSingleSong,playSingleSongSuccessfully,playSingleSongFailed} 
= playReducer.actions;
export default playReducer.reducer;
import React from 'react'
import axiosService from '../utils/AxiosService'
import { API_ENDPOINT } from '../utils/Constaints'
import {isObject,isString} from '../utils/UtilsFunction'
const url = 'api/songs'
export const updateTotalListen = (req) => {
    const path = API_ENDPOINT + url+'/updateTotalListen';
    let formData = new FormData();
    formData.append('id',parseInt(req.id));
    formData.append('target',req.target);
    return axiosService.post(path, formData);
}
export const paginationSongs = (paginationRequest) => {
    return axiosService.post(API_ENDPOINT + url, paginationRequest);
}
export const getSongById = (id) => {
    const path = API_ENDPOINT + url + `/${id}`;
    return axiosService.get(path);
}
export const getTop15BestSong = () => {
    const path = url + '/top15'
    let data = axiosService.get(API_ENDPOINT + path);
    return data;
}
export const saveSong = (data) => {
    let path = ''
  
    let artistSongArray = [];
    if (data.txtArtist != undefined) {
        data.txtArtist.forEach((e) => {
            let obj = { artists: e, songs: null };
            artistSongArray.push(obj);
        })
    }
    let songs = { id: data.id, title: data.txtTitle,genres:data.genres, lyrics: data.txtLyrics, artistSongs: artistSongArray }
    if(data.timePlay != undefined){
        songs.timePlay= data.timePlay;
    }
    let files = [data.image, data.mp3File]
    let formData = new FormData();
    formData.append('song',JSON.stringify(songs))
    if(!isString(data.image) && !isString(data.mp3File)){
        formData.append('files',files[0]);
        formData.append('files',files[1]);
    }
    if (data.id == null || data.id == undefined) {
        path = API_ENDPOINT + url + '/save';
        return axiosService.post(path, formData);
    } else {
        path = API_ENDPOINT + url + `/update-song/${data.id}`
        return axiosService.post(path, formData);
    }
    
}
export const deleteListSong = (data) =>{
    const path = API_ENDPOINT + url + `/delete`;

    return axiosService.post(path,data);
}


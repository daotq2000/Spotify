import React from 'react'
import axiosService from '../utils/AxiosService'
import { API_ENDPOINT } from '../utils/Constaints'

let url = 'api/albums'

export const paginationAlbum = (paginationRequest) => {
    const path = API_ENDPOINT + url;
    return axiosService.post(path, paginationRequest);
}
export const getAlbumById = (id) => {
    return axiosService.get(API_ENDPOINT + url + `/${id}`);
}
export const deleteAlbumById = (id) => {
    return axiosService.delete(id);
}
export const deleteAlbumList = (albumListId) => {
    const path = API_ENDPOINT +url+'/delete';
    return axiosService.post(path,albumListId);
}
export const saveAlbum = (data) => {
    let albumSongs = data.albumSongs;
    let replaceAlbumSongs = [];
    albumSongs.forEach((e) => {
        let obj = { albums: null, songs: e };
        replaceAlbumSongs.push(obj);
    })
    let artistAlbum = data.artistAlbums;
    let replaceArtistAlbum = [];
    artistAlbum.forEach((e) => {
        let obj = { albums: null, artists: e };
        replaceArtistAlbum.push(obj);
    })
    let result = { albumName: data.albumName, albumTimeLength: data.albumTimeLength, genres: data.genres, artistAlbums: replaceArtistAlbum, albumSongs: replaceAlbumSongs }
    let formData = new FormData();
 
    let path = ''
    if(data.id !=undefined || data.id !=null){
        path=API_ENDPOINT + url + `/update/${data.id}`;
        if (typeof data.image === 'string') {
            result.image = data.image;
        }
        result.releaseDate = data.releaseDate;
        result.id = data.id;
    }else{
        path = API_ENDPOINT + url + `/save`;
    }
    formData.append('album',JSON.stringify(result));
    formData.append('file', data.file);
    return axiosService.post(path, formData);
}
import axiosService from '../utils/AxiosService'
import {API_ENDPOINT} from '../utils/Constaints'

let url = 'api/genres/'
export const paginationGenresAPI=(paginationRequest) =>{
    const path = API_ENDPOINT+url;
    return axiosService.post(path,paginationRequest);
}
export const getGenresById = (id)=>{
    return axiosService.get(API_ENDPOINT+url+`${id}`);
}
export const deleteGenresById = (id) =>{
    return axiosService.delete(id);
}
export const getAlbumAndSongByGenresId = (payload) =>{
    const id = payload.id;
    const albumRequest = payload.albumRequest;
    const songRequest = payload.songRequest;
    const path = API_ENDPOINT+url+`album-song/${id}`
    let formData = new FormData();
    formData.append('paginationAlbum',JSON.stringify(albumRequest))
    formData.append('paginationSong',JSON.stringify(songRequest))
    return axiosService.post(path,formData);
}
import axiosService from '../utils/AxiosService'
import { API_ENDPOINT } from '../utils/Constaints'
import { isString, isObject } from '../utils/UtilsFunction'
const url = 'api/artist'

export const paginationArtist = (paginationRequest) => {
    return axiosService.post(API_ENDPOINT + url, paginationRequest);
}
export const getArtistById = (id) => {
    return axiosService.get(API_ENDPOINT + url + `/${id}`);
}
export const deleteArtistById = (id) => {
    return axiosService.delete(id);
}
export const saveArtist = (data) => {
    const path = API_ENDPOINT + url + `/save`;
    const requestBody = {
        fullName: data.txtFullName, countryActive: data.txtCountryActive, description: data.txtDescription,
        birthDay: data.txtBirthday, gender: data.txtGender
    };

    if (data.id != undefined) {
        requestBody.id = data.id;
    }
    let formData = new FormData();
    formData.append('artist', JSON.stringify(requestBody));
    
    if (isObject(data.image)) {
        formData.append('file', data.image);
    }
    if(data.id != undefined){
        let pathUpdate =  API_ENDPOINT + url + `/update-artist/${data.id}`;
        return axiosService.put(pathUpdate,formData);
    }
    return axiosService.post(path, formData);
}
export const getAllSongByArtistId= (id) =>{
    const path = API_ENDPOINT+url + `/artist-song/${id}`;
    return axiosService.get(path);
}
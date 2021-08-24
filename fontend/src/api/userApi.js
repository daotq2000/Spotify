import axiosService from '../utils/AxiosService'
import { API_ENDPOINT } from '../utils/Constaints'
export const saveAndEditUser = (request) =>{
    const url = API_ENDPOINT+'api/users/register';
    let formData = new FormData();
    formData.append('user',JSON.stringify(request.user));
    if(request.image != undefined || request.image != null){
        formData.append('image',request.image);
    }
    return axiosService.post(url,formData);
}
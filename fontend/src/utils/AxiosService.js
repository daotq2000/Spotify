import Axios from "axios";

class AxiosService {
    
    constructor() {
        // const Authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYW90cTEiLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNjI5MDk4OTQxLCJleHAiOjE2MjkxOTg5NDF9.RqftGG34T_kTHqjgQWacIEdBJydBsRDjL1H2BzOQ_vkXZkjOVOEqVjEWuer3jEajJB83Libq4-3robpSR1oTqQ';
        // localStorage.setItem('Authorization',Authorization)
        const instance = Axios.create();
        instance.interceptors.response.use(this.handleSucess, this.handleError)
        this.instance = instance;
    }

    handleSucess(res) {
        return res;
    }

    handleError(e) {
        return Promise.reject(e);
    }

    get(url) {
        return this.instance.get(url, { 'headers': { 'Authorization': localStorage.getItem("Authorization") } });
    }
    post(url) {
        return this.instance.post(url, { 'headers': { 'Authorization': localStorage.getItem("Authorization") } })
    }
    post(url, body) {
        return this.instance.post(url, body, { 'headers': { 'Authorization': localStorage.getItem("Authorization") } })
    }

    put(url, body) {
        return this.instance.put(url, body, { 'headers': { 'Authorization': localStorage.getItem("Authorization") } })
    }

    delete(url) {
        return this.instance.delete(url, { 'headers': { 'Authorization': localStorage.getItem("Authorization") } })
    }
}

export default new AxiosService();
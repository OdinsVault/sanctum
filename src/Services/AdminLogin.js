import {API} from "./APICallService";

export async function adminLogin(data){
    const endpoint = '/admin/login';
    var body = {
        email:data.email,
        password:data.password
    }
    let api = await API();
    var response = await api.post(endpoint,body);
    return response;
}
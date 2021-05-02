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


export function AdminLogOnStatus() {
    let token = localStorage.getItem('token');
    var usersession = localStorage.getItem('usersession');
    if (usersession) {
        var userSessionObj = JSON.parse(usersession);
    }
    if (token) {
        return userSessionObj.Role[0] === 'admin';
    } else {
        return false;
    }
}
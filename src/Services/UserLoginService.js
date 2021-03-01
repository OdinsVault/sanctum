import {API} from "./APICallService";

export async function login(list){
    const endpoint = '/user/login';

    console.log(list);
    var data = {
        email:list.username,
        password:list.password
    }

    let api = await API();
    var response = await api.post(endpoint,data);
    console.log("res",response)
    return true;
}

export function logout() {
    localStorage.removeItem('token');
}
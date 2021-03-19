import {API} from "./APICallService";

export async function login(list){
    const endpoint = '/user/login';


    var body = {
        email:list.email,
        password:list.password
    }
    console.log(body)
    let api = await API();
    var response = await api.post(endpoint,body);
    return response;
}

export function logout() {
    localStorage.removeItem('token');
}


export async function getUserDetails (userId) {
    const endpoint = `/leaderboard/${userId}`;
    let api = await API();
    var response = await api.get(endpoint);
    return response;
}
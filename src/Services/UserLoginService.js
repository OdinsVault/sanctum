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
    console.log("Logout");
    localStorage.removeItem('token');
    localStorage.removeItem('usersession');

}


export async function getUserDetails (userId) {
    const endpoint = `/leaderboard/${userId}`;
    let api = await API();
    var response = await api.get(endpoint);
    return response;
}

export async function signup(user){
    console.log(user);
    const endpoint = '/user/signup';
    let api = await API();
    var response = await api.post(endpoint,user);
    return response;
}


import {API} from "./APICallService";

export async function login(list) {
    const endpoint = '/user/login';
    var body = {
        email: list.email,
        password: list.password
    }
    let api = await API();
    var response = await api.post(endpoint, body);
    return response;
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usersession');
}


export async function getUserDetails(userId) {
    const endpoint = `/leaderboard/${userId}`;
    let api = await API();
    var response = await api.get(endpoint);
    return response;
}

export async function signup(user) {
    const endpoint = '/user/signup';
    let api = await API();
    var response = await api.post(endpoint, user);
    return response;
}

export function CheckLogOnStatus() {
    let token = localStorage.getItem('token');
    var usersession = localStorage.getItem('usersession');
    if (usersession) {
        var userSessionObj = JSON.parse(usersession);
    }
    if (token) {
        if (userSessionObj.Role[0] !== 'admin') {
            return true;
        }
    } else {
        return false;
    }
}


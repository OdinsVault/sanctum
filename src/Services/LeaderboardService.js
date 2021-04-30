import {API} from "./APICallService";

export async function getRankings(page,limit) {
    const endpoint = `/leaderboard?page=${page}&limit=${limit}`;
    let api = await API();
    var response = await api.get(endpoint);
    return response;
}

function getToken (){
    var token = localStorage.getItem('token');
    const options = {
        headers: {'AUTHORIZATION':`Bearer ${token}`}
    }
    return options;
}

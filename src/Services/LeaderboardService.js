import {API} from "./APICallService";

export async function getRankings(page,limit) {
    const endpoint = `/leaderboard?page=${page}&limit=${limit}`;
    let api = await API();
    var response = await api.get(endpoint);
    return response;
}

export async function getFiltered(filter) {
    let endpoint = `/leaderboard/filter?s=${filter.score}&i=${filter.institute}`;    
    const api = await API();
    return api.get(endpoint);
}

export async function getUserAutocomplete(query) {
    const endpoint = `/user/autocomplete?search=${query}`;
    const api = await API();
    return api.get(endpoint);
}

export async function searchUser(userId) {
    const endpoint = `/leaderboard/${userId}`;
    const api = await API();
    return api.get(endpoint);
}

function getToken (){
    var token = localStorage.getItem('token');
    const options = {
        headers: {'AUTHORIZATION':`Bearer ${token}`}
    }
    return options;
}

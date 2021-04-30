import {API} from "./APICallService"

export async function getCourses(){

    const endpoint = '/questions/overview';
    var header = getToken();
    let api = await API();
    var response = await api.get(endpoint,header);
    return response;
}

export async function getCourseDetails(level){

    const endpoint = `/tutorial/${level}`;
    var header = getToken();
    let api = await API();
    var response = await api.get(endpoint,header);
    return response;
}

function getToken (){
    var token = localStorage.getItem('token');
    const options = {
        headers: {'AUTHORIZATION':`Bearer ${token}`}
    }
    return options;
}



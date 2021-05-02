import {API} from "./APICallService";

export async function getAllCompete (){
    const endpoint = `/competequestion`;
    let header = getToken();
    let api = await API();
    return await api.get(endpoint,header);

}

export async function getQuestionByCategory (){
    const endpoint = `/competequestion/bycategory`;
    let header = getToken();
    let api = await API();
    return await api.get(endpoint,header);
}


export async function getQuestionsOverview (){
    const endpoint = `/competequestion/overview`;
    let header = getToken();
    let api = await API();
    return await api.get(endpoint,header);
}

export async function getCompeteQuestionById (qId){
    const endpoint = `/competequestion/${qId}`;
    let header = getToken();
    let api = await API();
    return await api.get(endpoint,header);
}

export async function runCompeteAnswer (qId,submission){
    const endpoint = `/answer/compete-run/${qId}`;
    let header = getToken();
    let api = await API();
    return await api.post(endpoint,submission,header);

}
export async function submitCompeteAnswer (qId,submission){
    const endpoint = `/answer/compete/${qId}`;
    let header = getToken();
    let api = await API();
    return await api.post(endpoint,submission,header);

}

function getToken (){
    var token = localStorage.getItem('token');
    const options = {
        headers: {'AUTHORIZATION':`Bearer ${token}`}
    }
    return options;
}

import {API} from "./APICallService";

export async function getQuestionList(level) {

     const endpoint = `/questions/overview/${level}`;
    let header = getToken();
     let api = await API();
    return await api.get(endpoint, header)
}

export async function getQuestionById (qId){
    const endpoint = `/questions/${qId}`;
    let api = await API();
    var response = await api.get(endpoint);
    return response;
}

export async function getQuestionByLevel (){
    const endpoint = `/questions/bylevel`;
    let api = await API();
    var response = await api.get(endpoint);
    return response;
}

export  async function getAllQuestions (){
    const endpoint = `/questions`;
    let api = await API();
    var response = await api.get(endpoint);
    return response;
}

export async function runPracticeAnswer (qid,code){
    const endpoint = `/answer/practice-run/${qid}`;
    let body = {
        answer:code.answer,
    }
    let header = getToken();
    let api = await API();
    return  await api.post(endpoint,body,header);
}

export async function submitPracticeAnswer (qid,submission){
    const endpoint = `/answer/practice/${qid}`;
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




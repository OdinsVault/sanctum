import {API} from "./APICallService";
import {getByCategory} from "../constant";


export async function getAllCompete (){
    const endpoint = `/competequestion`;
    let api = await API();
    var response = await api.get(endpoint);
    return response;
}

export async function getQuestionByCategory (){
    const endpoint = `/competequestion/bycategory`;
    let api = await API();
    var response = await api.get(endpoint);
    return getByCategory;
}

export async function getCompeteQuestionById (qId){
    const endpoint = `/competequestion/${qId}`;
    let api = await API();
    var response = await api.get(endpoint);
    return response;
}

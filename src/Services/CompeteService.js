import {API} from "./APICallService";
import {getByCategory} from "../constant";


export async function getAllCompete (){
    const endpoint = `/competequestion`;
    let api = await API();
    return await api.get(endpoint);

}

export async function getQuestionByCategory (){
    const endpoint = `/competequestion/bycategory`;
    let api = await API();
    return await api.get(endpoint);
}

export async function getCompeteQuestionById (qId){
    const endpoint = `/competequestion/${qId}`;
    let api = await API();
    return await api.get(endpoint);

}


// const options = {
//     headers: {'AUTHORIZATION':`Bearer ${token}`}
// }
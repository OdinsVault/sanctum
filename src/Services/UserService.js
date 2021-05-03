import {API} from "./APICallService";
import {user} from "../constant";


export async function  addNewUser(user){
    // const endpoint = ''
    // let api = await API();
    // return api.get(endpoint);
    return true;
}

export async function  getUser(){

    const endpoint = '/user'
    const options = getToken()
    let api = await API();
    return  await api.get(endpoint,options);
}

export async function  updateUser(user){

    const endpoint = '/user'
    const options = getToken();
    let api = await API();
    return await api.put(endpoint,user,options);
}

export async function  deleteUser(){

    const endpoint = '/user'
    const options = getToken();
    let api = await API();
    return await api.delete(endpoint,options);
}


function getToken (){
    var token = localStorage.getItem('token');
    const options = {
        headers: {'AUTHORIZATION':`Bearer ${token}`}
    }
    return options;
}







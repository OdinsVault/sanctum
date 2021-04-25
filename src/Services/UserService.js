import {API} from "./APICallService";
import {user} from "../constant";


export async function  addNewUser(user){
    // const endpoint = ''
    // let api = await API();
    // return api.get(endpoint);
    return true;
}

export async function  getUser(token){

    const endpoint = '/user'
    // const options = {
    //     headers: {'AUTHORIZATION':`${token}`}
    // }
    // let api = await API();
    // return api.get(endpoint,options);
    return user;
}

export async function  updateUser(user,token){

    const endpoint = '/user'
    const options = {
        headers: {'AUTHORIZATION':`Bearer ${token}`}
    }
    let api = await API();
    // return api.put(endpoint,user,options);
    return user;
}







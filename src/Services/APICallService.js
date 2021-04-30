import axios from 'axios';
import {notification} from "antd";


function parseError(errorResponse) {
    if (errorResponse && errorResponse.config && errorResponse.status) {

        if (401 === errorResponse.status) {
            console.log(errorResponse);
            notification.error({message:errorResponse.data})
            window.location.href = "/login";
        }

        return Promise.reject({
            statuscode: errorResponse.status,
            cause: errorResponse.data
        });
    } else {
        return Promise.reject({
            cause: `Error occured in request.`
        });
    }

}

function parseBody(response) {
    if (response.status === 200) {
        return response.data;
    } else {
        return parseError(response)
    }
}

function fetchBaseURL() {
            return 'https://simply-server.herokuapp.com/v1';
}

export async function API() {

    if (axios.defaults.instance) {
        return axios.defaults.instance;
    }

    let baseurl = await fetchBaseURL();
    axios.defaults.baseURL = baseurl;

    let instance = axios.create();

    // Process the response and get return value
    instance.interceptors.response.use((response) => {
        return parseBody(response);
    }, error => {
        if (error.response) {
            return parseError(error.response);
        } else {
            return Promise.reject({
                cause: `Error occured in request.`
            })
        }
    });

    axios.defaults.instance = instance;

    return instance;
}
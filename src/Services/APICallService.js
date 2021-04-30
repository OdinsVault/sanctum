import axios from 'axios';

import {notification} from "antd";
import {logout} from "./UserLoginService";

function parseError(errorResponse) {
    if (errorResponse && errorResponse.config && errorResponse.status) {

        if (401 === errorResponse.status) {   //if unauthorized
            let tokenExpire = !!errorResponse.data.error
            if (tokenExpire) {  //if token expired
                let token = localStorage.getItem("token");
                if (token) {
                    if (errorResponse.data.error.name === "TokenExpiredError") {
                        notification.error({
                            message: errorResponse.data.message,
                            description: errorResponse.data.error.name
                        })
                        logout();
                        setTimeout(window.location.href = "/login", 5000)
                    }
                }
            }
        }

        return Promise.reject({
            status: errorResponse.status,
            message: errorResponse.data.message
        });
    }

    return Promise.reject({
        message: `Error occured in request.`
    });

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
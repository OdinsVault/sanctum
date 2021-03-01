import axios from 'axios';


function parseError(errorResponse) {
    if (errorResponse && errorResponse.config && errorResponse.status) {

        if (401 === errorResponse.status) {
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
    // return fetch('./config.json')
        // .then(response => response.json())
        // .then(data => {
            return 'https://simply-server.herokuapp.com/';
        // });
}

export async function API() {

    if (axios.defaults.instance) {
        return axios.defaults.instance;
    }

    let baseurl = await fetchBaseURL();
    axios.defaults.baseURL = baseurl;

    let instance = axios.create();

    // // Do something before request is sent
    // instance.interceptors.request.use((config) => {
    //
    //         // Debug Info
    //         // console.log(localStorage.getItem('token'));
    //         // console.log(localStorage.getItem('loggedInData'));
    //         //
    //
    //         var authTicket = localStorage.getItem('token');
    //         if (authTicket != null) {
    //             config.headers = { 'TicketHeader': authTicket };
    //         }
    //
    //         var routeIndex = _.findIndex(global_loader_skip_list, function (o) { return (config.url).includes(o); });
    //         if (routeIndex < 0) {
    //             document.body.classList.add('loading-indicator');
    //         }
    //
    //         return config;
    //
    //     },
    //     error => {
    //         return Promise.reject(error)
    //     });

    // Process the response and get return value
    instance.interceptors.response.use((response) => {

        // document.body.classList.remove('loading-indicator');

        return parseBody(response);
    }, error => {
        // document.body.classList.remove('loading-indicator');
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
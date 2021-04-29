import {API} from "./APICallService"
import {courseDetails, courses} from '../constant'

export async function getCourses(){

    const endpoint = '/questions/overview';
    var header = getToken();
    let api = await API();
    var response = await api.get(endpoint,header);
    console.log(response)
    return response;
}

export async function getCourseDetails(level){


    const endpoint = `/tutorial/${level}`;
    var header = getToken();
    let api = await API();
    var response = await api.get(endpoint,header);
    return response;
}

export async function getNextCourse(cid){
    var course = ''
    for(let i =0;i<courses.length;i++){
        if(courseDetails[i].courseId===cid){
            if(i+1 === courseDetails.length){
                course=''
            }
            else{
                course = courseDetails[i+1]
            }
            break;
        }
    }

    // const endpoint = '';

    // let api = await API();
    // var response = await api.get(endpoint,data);
    return course;
}

function getToken (){
    var token = localStorage.getItem('token');
    const options = {
        headers: {'AUTHORIZATION':`Bearer ${token}`}
    }
    return options;
}



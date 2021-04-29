import {courseDetails, courses} from '../constant'

export async function getCourses(user){

    const endpoint = '/questions/overview';
    var header = getToken();
    // let api = await API();
    // var response = await api.get(endpoint,header);
    return courses;
}

export async function getCourseDetails(cid){

    var course = ''
    for(let i =0;i<courseDetails.length;i++){
        if(courseDetails[i].courseId===cid){
            course = courseDetails[i]
            break;
        }
    }
    const endpoint = '/questions/overview';
    var header = getToken();
    // let api = await API();
    // var response = await api.get(endpoint,header);
    return course;
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



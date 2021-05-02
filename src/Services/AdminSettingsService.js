import {API} from "./APICallService";

///////Courses/////////
export async function AddNewCourse (submission){
  const endpoint = `/admin/tutorial`;
  let header = getToken();
  let body ={
    'level':submission.level,
    'title':submission.title,
    'description':submission.description
  }
  let api = await API();
  return await api.post(endpoint,body,header);

}
export async function EditCourse (level,submission){
  const endpoint = `/admin/tutorial/${level}`;
  let header = getToken();
  let body ={
    'level':submission.level,
    'title':submission.title,
    'description':submission.description
  }
  let api = await API();
  return await api.patch(endpoint,body,header);

}

export async function DeleteCourse (level){
  const endpoint = `/admin/tutorial/${level}`;
  let header = getToken();
  let api = await API();
  return await api.delete(endpoint,header);

}


////////Practice////////

export async function NewPractical(submission){
  const endpoint = `/admin/questions`;
  let header = getToken();
  let api = await API();
  return await api.post(endpoint,submission,header);

}
export async function EditPracticeQuestion(qId,submission){
  const endpoint = `/admin/questions/${qId}`;
  let header = getToken();
  let api = await API();
  return await api.patch(endpoint,submission,header);

}

export async function DeletePractical(qId){
  const endpoint = `/admin/questions/${qId}`;
  let header = getToken();
  let api = await API();
  return await api.delete(endpoint,header);

}

////////Compete////////

export async function NewCompete(submission){
  const endpoint = `/admin/competequestion`;
  let header = getToken();
  let api = await API();
  return await api.post(endpoint,submission,header);

}
export async function EditCompete(qId,submission){
  const endpoint = `/admin/competequestion/${qId}`;
  let header = getToken();
  let api = await API();
  return await api.patch(endpoint,submission,header);

}

export async function DeleteCompete(qId){
  const endpoint = `/admin/competequestion/${qId}`;
  let header = getToken();
  let api = await API();
  return await api.delete(endpoint,header);

}

function getToken (){
  var token = localStorage.getItem('token');
  const options = {
    headers: {'AUTHORIZATION':`Bearer ${token}`}
  }
  return options;
}

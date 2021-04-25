import {API} from "./APICallService";
import {quizzes,practiceSubReponseSuccess} from "../constant";

export async function getQuestionList(user,quizID) {

    var questions = [];
    for (let i = 0; i < quizzes.length; i++) {
    if(quizzes[i].quizId===quizID){
        return quizzes[i]
    }
    }
    //  const endpoint = '';
    //  var data = {
    // userId:user.userId,
    //     quizId:quizID
    //  }
    //  let api = await API();
    //  var response = await api.get(endpoint,data);
    // return response
}

export async function getQuestionById (qId){
    const endpoint = `/questions/${qId}`;
    let api = await API();
    var response = await api.get(endpoint);
    return response;
}

export async function getQuestionByLevel (){
    const endpoint = `/questions/bylevel`;
    let api = await API();
    var response = await api.get(endpoint);
    return response;
}

export  async function getAllQuestions (){
    const endpoint = `/questions`;
    let api = await API();
    var response = await api.get(endpoint);
    return response;
}

export async function runPracticeAnswer (qid,code,mClass){
    // const endpoint = `/answer/practice/${qid}`;
    // let body = {
    //     answer:code,
    //     mainClass:mClass
    // }
    // let api = await API();
    // var response = await api.post(endpoint,body);
    return true;
}

export async function submitPracticeAnswer (qid,submission){
    const endpoint = `/answer/practice/${qid}`;
    let api = await API();
    // var response = await api.post(endpoint,submission);
    return practiceSubReponseSuccess;
}



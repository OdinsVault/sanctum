import {API} from "./APICallService";
import {quizzes} from "../constant";

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

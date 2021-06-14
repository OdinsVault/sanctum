import {API} from './APICallService';

export async function getCodeVisualize(code) {
  const endpoint = `/visualize`;
  let body = {
    answer: code,
    lang: 'eng'
  };
  let header = getToken();
  let api = await API();
  return await api.post(endpoint, body, header);
}

function getToken() {
  var token = localStorage.getItem("token");
  const options = {
    headers: { AUTHORIZATION: `Bearer ${token}` },
  };
  return options;
}
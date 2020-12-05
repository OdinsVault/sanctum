import axios from "axios";

const BASE_URL = "http://localhost:8080";

class VisualizerService {
  sendCodeSnippet() {
    return axios.get(BASE_URL);
  }
}

export default new VisualizerService();

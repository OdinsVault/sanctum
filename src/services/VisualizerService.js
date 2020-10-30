import axios from "axios";

const VISUALIZER_API_BASE_URL = "http://localhost:8080/api/v1/code";

class VisualizerService {
  sendCodeSnippet(code) {
    return axios.post(VISUALIZER_API_BASE_URL, { code });
  }
}

export default new VisualizerService();

import axios from 'axios';

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "5520600fd44df99ae2f77b8c05178b00",
    language: "ko-KR"
  }
})

export default instance;
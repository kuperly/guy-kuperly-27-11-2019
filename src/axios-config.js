import axios from "axios";

const instance = axios.create({
  baseURL: "https://dataservice.accuweather.com/"
});

export default instance;

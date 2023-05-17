import axios from "axios";

const list = () => axios.get("/organizations");

const organizationsApi = { list };

export default organizationsApi;

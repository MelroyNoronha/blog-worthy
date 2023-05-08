import axios from "axios";

const list = () => axios.get("/posts");

const postsApi = { list };

export default postsApi;

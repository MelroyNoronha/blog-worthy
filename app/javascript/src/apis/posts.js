import axios from "axios";

const list = () => axios.get("/posts");

const create = payload =>
  axios.post("/posts", {
    post: payload,
  });

const postsApi = { list, create };

export default postsApi;

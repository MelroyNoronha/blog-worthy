import axios from "axios";

const list = () => axios.get("/posts");

const show = slug => axios.get(`/posts/${slug}`);

const create = payload =>
  axios.post("/posts", {
    post: payload,
  });

const update = ({ slug, payload }) =>
  axios.put(`/posts/${slug}`, {
    post: payload,
  });

const postsApi = { list, show, create, update };

export default postsApi;

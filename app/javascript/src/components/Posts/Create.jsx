import React, { useState } from "react";

import postsApi from "apis/posts";
import Container from "components/Container";

import Form from "./Form";

const Create = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.create({ title, description });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form
        description={description}
        handleSubmit={handleSubmit}
        loading={loading}
        setDescription={setDescription}
        setTitle={setTitle}
        title={title}
      />
    </Container>
  );
};

export default Create;

import React from "react";

import { Input, Button, Textarea } from "@bigbinary/neetoui";

const Form = ({
  type = "create",
  title,
  setTitle,
  description,
  setDescription,
  loading,
  handleSubmit,
}) => (
  <form className="mx-auto max-w-lg">
    <Input
      required
      label="Title"
      maxLength={125}
      placeholder="Post Title (Max 125 Characters Allowed)"
      value={title}
      onChange={e => setTitle(e.target.value)}
    />
    <Textarea
      label="Description"
      value={description}
      onChange={e => setDescription(e.target.value)}
    />
    <Button
      label={type === "create" ? "Create Post" : "Update Post"}
      loading={loading}
      type="submit"
      onClick={handleSubmit}
    />
  </form>
);

export default Form;

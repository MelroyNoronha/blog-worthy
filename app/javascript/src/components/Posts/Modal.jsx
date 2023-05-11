import React from "react";

import { Modal, Header, Body, Typography } from "@bigbinary/neetoui";

const PostModal = ({ title, description, onClose, isOpen }) => (
  <Modal
    closeButton
    closeOnEsc
    closeOnOutsideClick
    isOpen={isOpen}
    onClose={onClose}
  >
    <Header>
      <Typography id="dialog1Title" style="h2">
        {title}
      </Typography>
      <Body className="space-y-2">
        <Typography lineHeight="normal" style="body2">
          {description}
        </Typography>
      </Body>
    </Header>
  </Modal>
);

export default PostModal;

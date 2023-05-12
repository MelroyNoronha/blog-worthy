import React, { useEffect, useState } from "react";

import { Modal as NeetoModal, Typography } from "@bigbinary/neetoui";
import { useHistory, useParams } from "react-router-dom";

import postsApi from "apis/posts";
import { PageLoader } from "components/Common";

const Modal = () => {
  const history = useHistory();
  const { slug } = useParams();
  const [postDetails, setPostDetails] = useState({});
  const [pageLoading, setPageLoading] = useState(true);

  const fetchPostDetails = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setPostDetails(post);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const onClose = () => {
    history.goBack();
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <NeetoModal isOpen size="large" onClose={onClose}>
      <NeetoModal.Header>
        <Typography style="h2">{postDetails?.title}</Typography>
      </NeetoModal.Header>
      <NeetoModal.Body className="mb-4">
        <Typography style="body2">{postDetails?.description}</Typography>
      </NeetoModal.Body>
    </NeetoModal>
  );
};

export default Modal;

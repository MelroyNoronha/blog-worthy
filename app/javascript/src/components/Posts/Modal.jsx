import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import ReactModal from "react-modal";
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
    <ReactModal isOpen onRequestClose={onClose}>
      <Typography style="h2">{postDetails?.title}</Typography>
      <div className="my-4">
        <Typography style="body1">By: {postDetails?.author.name}</Typography>
      </div>
      <div className="my-4">
        <Typography style="body2">{postDetails?.description}</Typography>
      </div>
    </ReactModal>
  );
};

export default Modal;

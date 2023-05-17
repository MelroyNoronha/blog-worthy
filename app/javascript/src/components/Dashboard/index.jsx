import React, { useState, useEffect } from "react";

import { posts as postsApi } from "apis";
import { isNil, isEmpty, either } from "ramda";

import { Container, PageLoader } from "components/Common";
import { PostsContainer, PostsHeader, PostCard } from "components/Posts";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.list();
      setPosts(posts);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(posts)) {
    return (
      <Container>
        <h1 className="text-center text-xl leading-5">
          You do not have any posts yet 😔
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      <PostsContainer>
        <PostsHeader />
        {posts.map(post => (
          <PostCard key={post.id} postData={post} />
        ))}
      </PostsContainer>
    </Container>
  );
};

export default Dashboard;

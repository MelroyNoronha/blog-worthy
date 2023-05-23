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

  const handleUpvotePress = async (slug, upvotes) => {
    try {
      const updatedUpvotes = upvotes + 1;
      await postsApi.update({
        slug,
        payload: {
          upvotes: updatedUpvotes,
        },
      });

      await fetchPosts();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleDownvotePress = async (slug, downvotes) => {
    try {
      const updatedDownvotes = downvotes + 1;
      await postsApi.update({
        slug,
        payload: {
          downvotes: updatedDownvotes,
        },
      });

      await fetchPosts();
    } catch (error) {
      logger.error(error);
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
          <PostCard
            handleUpvotePress={() => handleUpvotePress(post.slug, post.upvotes)}
            key={post.id}
            postData={post}
            handleDownvotePress={() =>
              handleDownvotePress(post.slug, post.downvotes)
            }
          />
        ))}
      </PostsContainer>
    </Container>
  );
};

export default Dashboard;

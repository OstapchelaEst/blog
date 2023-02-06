import PostCard from 'components/UI/PostCard';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import { fetchGetPosts } from 'store/async-actions/getPosts';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks/custom-hooks';
const PostsPage = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.PostsSlice);
  const { isAuth } = useAppSelector((state) => state.AuthorizationSlice);

  useEffect(() => {
    dispatch(fetchGetPosts());
  }, [dispatch]);

  if (!isAuth) {
    return <Navigate to={'/authorization'} />;
  }

  return (
    <div>
      {posts.map((post) => {
        return (
          <PostCard key={post._id} author={post.author} date={post.datePublish} text={post.text} />
        );
      })}
    </div>
  );
};

export default PostsPage;

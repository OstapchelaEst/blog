import PostCard from 'components/UI/PostCard';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import { fetchGetPosts } from 'store/async-actions/posts/getPosts';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks/custom-hooks';
const PostsPage = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.PostsSlice);
  const { isAuth, userData } = useAppSelector((state) => state.AuthorizationSlice);

  useEffect(() => {
    dispatch(fetchGetPosts());
  }, [dispatch]);

  if (!isAuth) {
    return <Navigate to={'/authorization'} />;
  }

  return (
    <div>
      {posts
        .filter((post) => !post.whoIgnore.includes(userData!.userId))
        .map((post) => {
          return (
            <PostCard
              key={post._id}
              author={post.author}
              date={post.datePublish}
              text={post.text}
              idPost={post._id}
              whoLikes={post.whoLikes}
              authorID={post.authorID}
            />
          );
        })}
    </div>
  );
};

export default PostsPage;

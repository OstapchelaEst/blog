import PostCard from 'components/UI/PostCard';
import PostPreloader from 'components/UI/PostPreloader';
import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router';
import { fetchGetPosts } from 'store/async-actions/posts/getPosts';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks/custom-hooks';
import { loadingSlice } from 'store/slices/loading-slice';

const PostsPage = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.PostsSlice);
  const { isAuth, userData } = useAppSelector((state) => state.AuthorizationSlice);
  const { allPostsCount } = useAppSelector((state) => state.PostsSlice);
  const { startLoading } = loadingSlice.actions;
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const countSkip = useRef(0);

  const postObserver = new IntersectionObserver((entries) => {
    entries.forEach(async (elem) => {
      if (allPostsCount <= countSkip.current * 10) {
        if (containerRef.current) postObserver.unobserve(containerRef.current);
        return;
      }
      if (elem.isIntersecting) {
        if (containerRef.current) postObserver.unobserve(containerRef.current);
        setIsLoading(true);
        countSkip.current += 1;
        dispatch(fetchGetPosts({ countSkip: countSkip.current })).then(() => {
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
  });

  useEffect(() => {
    dispatch(startLoading());
    dispatch(fetchGetPosts({ countSkip: countSkip.current }));
  }, [dispatch, startLoading]);

  useEffect(() => {
    if (containerRef.current) postObserver.observe(containerRef.current);
  }, [containerRef, posts]);

  if (!isAuth) {
    return <Navigate to={'/authorization'} />;
  }

  return (
    <div>
      {posts
        .filter((post) => !post.whoIgnore.includes(userData!.userId))
        .map((post, index, arr) => {
          return (
            <PostCard
              key={post._id + post.datePublish}
              author={post.author}
              date={post.datePublish}
              text={post.text}
              idPost={post._id}
              whoLikes={post.whoLikes}
              authorID={post.authorID}
              ref={index === arr.length - 1 ? containerRef : null}
            />
          );
        })}
      {isLoading && <PostPreloader />}
    </div>
  );
};

export default PostsPage;

import PostCard from 'components/posts/PostCard';
import PostPreloader from 'components/posts/PostPreloader';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchGetPosts } from 'store/async-actions/posts/getPosts';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks/custom-hooks';
import { loadingSlice } from 'store/slices/loading-slice';
import { postsSlice } from 'store/slices/posts-slice';

const PostsPage = () => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.AuthorizationSlice);
  const { allPostsCount, posts } = useAppSelector((state) => state.PostsSlice);
  const { resetPosts } = postsSlice.actions;
  const { stopLoading, startLoading } = loadingSlice.actions;
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const countSkip = useRef(0);

  const getPosts = async () => {
    try {
      dispatch(startLoading());
      await dispatch(
        fetchGetPosts({ countSkip: countSkip.current, userId: userData!.userId })
      ).unwrap();
      dispatch(stopLoading());
    } catch (error) {
      dispatch(stopLoading());
      toast('Something went wrong');
    }
  };

  useEffect(() => {
    getPosts();
    return () => {
      dispatch(resetPosts());
    };
  }, [dispatch, resetPosts]);

  const postObserver = useMemo(() => {
    return new IntersectionObserver((entries) => {
      entries.forEach(async (elem) => {
        if (allPostsCount <= countSkip.current * 10 + 10) {
          if (containerRef.current) postObserver.unobserve(containerRef.current);
          return;
        }
        if (elem.isIntersecting) {
          if (containerRef.current) postObserver.unobserve(containerRef.current);
          setIsLoading(true);
          countSkip.current += 1;
          dispatch(fetchGetPosts({ countSkip: countSkip.current, userId: userData!.userId }))
            .unwrap()
            .then(() => {
              setIsLoading(false);
            })
            .catch(() => {
              setIsLoading(false);
              toast('Error happened while get posts');
            });
        } else {
          setIsLoading(false);
        }
      });
    });
  }, [allPostsCount, dispatch]);

  useEffect(() => {
    if (containerRef.current) postObserver.observe(containerRef.current);
  }, [containerRef, posts, postObserver]);

  return (
    <div>
      {posts.map((post, index, arr) => {
        return (
          <PostCard
            key={post._id}
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

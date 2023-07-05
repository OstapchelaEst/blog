import { Box, Typography } from '@mui/material';
import { ContentOrSkeleton } from 'helpers/content-or-skeleton';
import React, { useEffect, useState } from 'react';
import { StatisticFetchs } from 'http/fetch/statistics-fetch';
import { toast } from 'react-toastify';

export const StatisticPostsAndLikes = ({ userId }: { userId: string }) => {
  const [countPosts, setCountPosts] = useState<number>(0);
  const [countLikes, setCountLikes] = useState<number>(0);
  const [isLoading, setISLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUserStatistic = async () => {
      try {
        const countPosts = await StatisticFetchs.getAllUserPosts(userId);
        const countPostsLiked = await StatisticFetchs.getCountAllLikedPostst(userId);
        setCountPosts(countPosts.length);
        setCountLikes(countPostsLiked.countLikes);
        setISLoading(false);
      } catch (error) {
        toast('Somthing went wrong');
      }
    };
    getUserStatistic();
  }, []);

  return (
    <Box>
      <Typography color="primary" fontSize={20} fontWeight={900}>
        Statistic:
      </Typography>
      {ContentOrSkeleton(isLoading, `Number of posts created: ${countPosts}`, '90%')}
      {ContentOrSkeleton(isLoading, `Liked posts for all time: ${countLikes} `)}
    </Box>
  );
};

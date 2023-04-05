import { Avatar, Card, Skeleton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { Box } from '@mui/system';
import { AxiosResponse } from 'axios';
import $api from 'http/axios-instance';
import { StatisticFetchs } from 'http/fetch/statistics-fetch';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IPost } from 'store/slices/interfaces/posts-slice-interfaces';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { contentOrSkeleton } from 'helpers/content-or-skeleton';

interface IUserCard {
  name: string;
  email: string;
  userId: string;
}

const UserCard = ({ name, email, userId }: IUserCard) => {
  const [countPosts, setCountPosts] = useState<number>(0);
  const [countLikes, setCountLikes] = useState<number>(0);
  const [isLoading, setISLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllUserPosts = async () => {
      try {
        const countPosts = (await $api.post('/all-user-posts', { userId })) as AxiosResponse<
          IPost[]
        >;
        const countPostsLiked = (await StatisticFetchs.getCountAllLikedPostst({
          userId,
        })) as AxiosResponse<{ countLikes: number }>;
        setCountPosts(countPosts.data.length);
        setCountLikes(countPostsLiked.data.countLikes);
        setISLoading(false);
      } catch (error) {
        toast('Somthing went wrong');
      }
    };
    getAllUserPosts();
  }, []);

  return (
    <Card
      sx={{
        p: 2,
        mb: 2,
        display: 'flex',
        columnGap: 2,
        maxWidth: '40%',
        width: '100%',
        minWidth: '360px',
        mr: 'auto',
      }}
    >
      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        {name[0]}
      </Avatar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          flex: '1 1',
        }}
      >
        <Box>
          <Typography color="primary" fontSize={20} fontWeight={900}>
            Information:
          </Typography>
          {contentOrSkeleton(isLoading, `Name: ${name}`, '50%')}
          {contentOrSkeleton(isLoading, `Mail: ${email}`, '80%')}
        </Box>
        <Box>
          <Typography color="primary" fontSize={20} fontWeight={900}>
            Statistic:
          </Typography>
          {contentOrSkeleton(isLoading, `Number of posts created: ${countPosts}`, '90%')}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {contentOrSkeleton(isLoading, `Liked posts for all time: ${countLikes}`)}
            <FavoriteIcon sx={{ color: `${isLoading ? 'greey' : 'red'}`, ml: 1 }} />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default UserCard;

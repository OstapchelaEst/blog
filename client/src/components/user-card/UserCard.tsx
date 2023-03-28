import { Avatar, Card, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { Box } from '@mui/system';
import { AxiosResponse } from 'axios';
import $api from 'http/axios-instance';
import { StatisticFetchs } from 'http/fetch/statistics-fetch';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IPost } from 'store/slices/interfaces/posts-slice-interfaces';
import { UserCardSekeleton } from './UserCardSkeleton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PostAddIcon from '@mui/icons-material/PostAdd';

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
        console.log(error);
      }
    };
    getAllUserPosts();
  }, []);
  return isLoading ? (
    <UserCardSekeleton />
  ) : (
    <Card
      sx={{
        p: 2,
        mb: 2,
        display: 'flex',
        columnGap: 2,
        width: '40%',
        minWidth: '360px',
      }}
    >
      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        {name[0]}
      </Avatar>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        <Box>
          <Typography color="primary" fontSize={20} fontWeight={900}>
            Information:
          </Typography>
          <Typography>Name: {name}</Typography>
          <Typography>Mail: {email}</Typography>
        </Box>
        <Box>
          <Typography color="primary" fontSize={20} fontWeight={900}>
            Statistic:
          </Typography>
          <Typography>{`Number of posts created: ${countPosts}`}</Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography>{`Liked posts for all time: ${countLikes}`}</Typography>
            <FavoriteIcon sx={{ color: 'red', ml: 1 }} />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default UserCard;

import { Avatar, CardHeader } from '@mui/material';
import { red } from '@mui/material/colors';
import DothMenu from 'components/UI/DothMenu';
import React from 'react';
import { memo } from 'react';
import PostDothMenu from './PostDothMenu';
import { getDate } from 'helpers/helpers-functions';

interface IPostHeader {
  author: string;
  idPost: string;
  authorID: string;
  text: string;
  date: string;
}

const PostHeader = ({ author, idPost, authorID, text, date }: IPostHeader) => {
  const dateCreated = getDate(date);
  return (
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {author[0].toUpperCase()}
        </Avatar>
      }
      action={
        <DothMenu>
          <PostDothMenu idPost={idPost} authorID={authorID} text={text} />
        </DothMenu>
      }
      title={author}
      subheader={dateCreated}
    />
  );
};

export default memo(PostHeader);

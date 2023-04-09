import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Typography } from '@mui/material';
import React from 'react';
const MainPage = (): ReactJSXElement => {
  return (
    <div>
      <Typography sx={{ fontSize: 30 }}>
        This project was created in order to get experience in creating simple CRUD applications on
        <span style={{ fontWeight: 900 }}> Node.Js.</span> Functionality include: registration,
        logining, create/delete posts, create/delete comments to post, likes, ignore disliked posts,
        change posts and comments, littel statisc every user how meny likes he did and how many
        posts created
      </Typography>
    </div>
  );
};

export default MainPage;

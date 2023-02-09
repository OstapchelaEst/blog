import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppSelector } from 'store/custom-hooks/custom-hooks';
import DothMenuForOwner from 'components/DothMenuForOwner';
import DothMenuForAll from 'components/DothMenuForAll';

const ITEM_HEIGHT = 48;

export default function DothMenu({
  idPost,
  authorID,
  text,
}: {
  idPost: string;
  authorID: string;
  text: string;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { userData } = useAppSelector((state) => state.AuthorizationSlice);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 'fit-content',
          },
        }}
      >
        <DothMenuForAll idPost={idPost} handleClose={handleClose} />
        {authorID === userData!.userId && <DothMenuForOwner idPost={idPost} text={text} />}
      </Menu>
    </div>
  );
}

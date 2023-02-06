import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAppSelector } from 'store/custom-hooks/custom-hooks';
import { useNavigate } from 'react-router';
import CreatePostForm from './CreatePostForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const { isAuth } = useAppSelector((state) => state.AuthorizationSlice);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if (isAuth) {
      setOpen(true);
    } else {
      navigate('/authorization');
    }
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button sx={{ color: 'white' }} onClick={handleOpen}>
        Create post
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <CreatePostForm />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

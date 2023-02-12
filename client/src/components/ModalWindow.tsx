import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  width: '100%',
  bgcolor: 'background.paper',
  border: '3px solid #1976d2',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

interface IModalWindow {
  children: JSX.Element;
  buttonText: string;
  stylesButton?: SxProps<Theme>;
}

export default function TransitionsModal({ children, buttonText, stylesButton }: IModalWindow) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const clone = React.cloneElement(children, {
    closeModal: handleClose,
  });

  return (
    <div>
      <Button sx={stylesButton} onClick={handleOpen}>
        {buttonText}
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
          <Box sx={style}>{clone}</Box>
        </Fade>
      </Modal>
    </div>
  );
}

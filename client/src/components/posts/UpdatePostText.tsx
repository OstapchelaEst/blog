import { Button } from '@mui/material';
import { validationLengthPost } from 'helpers/validation-functions';
import React, { memo } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { fetchUpdatePostText } from 'store/async-actions/posts/updatePostText';
import { useAppDispatch } from 'store/custom-hooks/custom-hooks';
import CustomInput from '../UI/CustomInput';

interface IUpdatePostText {
  closeModal?: () => void;
  idPost: string;
  text: string;
}

const UpdatePostText = ({ closeModal, idPost, text }: IUpdatePostText) => {
  const { control, handleSubmit } = useForm({ mode: 'onChange' });
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FieldValues | { text: string }) => {
    try {
      await dispatch(fetchUpdatePostText({ id: idPost, newText: data.text })).unwrap();
      if (closeModal) closeModal();
    } catch (error) {
      toast('While change post something went wrong');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        name="text"
        control={control}
        label="Post text"
        type="text"
        multiline
        fullWidth
        oldValue={text}
        rules={{
          required: true,
          validate: {
            customFN: validationLengthPost,
          },
        }}
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ ml: 'auto', mr: 'auto', display: 'block', width: '100%' }}
      >
        Update
      </Button>
    </form>
  );
};

export default memo(UpdatePostText);

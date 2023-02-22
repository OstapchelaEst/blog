import { Button } from '@mui/material';
import { validationLengthPost } from 'helpers/validation-functions';
import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { fetchCreatePost } from 'store/async-actions/posts/createPost';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks/custom-hooks';
import CustomInput from '../UI/CustomInput';

const CreatePostForm = ({ closeModal }: { closeModal?: () => void }) => {
  const { control, handleSubmit } = useForm({ mode: 'onChange' });
  const { isAuth } = useAppSelector((state) => state.AuthorizationSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      if (closeModal) closeModal();
      navigate('/authorization');
    }
  }, [isAuth, navigate, closeModal]);

  const onSubmit = async (data: FieldValues | { text: string }) => {
    try {
      await dispatch(fetchCreatePost(data as { text: string })).unwrap();
      if (closeModal) closeModal();
    } catch (error) {
      toast('Something went wrong');
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
        Create
      </Button>
    </form>
  );
};

export default CreatePostForm;

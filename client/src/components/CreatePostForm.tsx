import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { fetchCreatePost } from 'store/async-actions/posts/createPost';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks/custom-hooks';
import CustomInput from './UI/CustomInput';

const validationCreatePost = (str: string): string | true => {
  return str.length > 140 ? 'Maximum length 140 symbols' : true;
};

const CreatePostForm = ({ closeModal }: { closeModal?: () => void }) => {
  const { control, handleSubmit } = useForm({ mode: 'onChange' });
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.AuthorizationSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      if (closeModal) closeModal();
      navigate('/authorization');
    }
  }, [isAuth, navigate, closeModal]);

  const onSubmit = async (data: FieldValues | { text: string }) => {
    await dispatch(fetchCreatePost(data as { text: string }));
    if (closeModal) closeModal();
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
            customFN: validationCreatePost,
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
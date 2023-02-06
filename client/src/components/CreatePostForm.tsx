import { Button, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import CustomInput from './UI/CustomInput';
const CreatePostForm = () => {
  const { control, handleSubmit } = useForm({ mode: 'onTouched' });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={{ mb: 1 }}>Entry post text</Typography>
        <CustomInput
          name="text"
          control={control}
          label="Post text"
          type="text"
          multiline
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" sx={{ ml: 'auto' }}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreatePostForm;

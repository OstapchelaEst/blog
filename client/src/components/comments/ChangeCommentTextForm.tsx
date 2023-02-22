import { Button } from '@mui/material';
import { validationLengthPost } from 'helpers/validation-functions';
import React, { Dispatch, SetStateAction } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import CustomInput from '../UI/CustomInput';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommentsFetch from 'http/fetch/comments-fetch';
import { IComment } from 'store/slices/interfaces/posts-slice-interfaces';

interface IUpdatePostText {
  closeModal?: () => void;
  setCommentText: Dispatch<SetStateAction<string>>;
  commentId: string;
  text: string;
}

const ChangeCommentTextForm = ({
  closeModal,
  commentId,
  text,
  setCommentText,
}: IUpdatePostText) => {
  const { control, handleSubmit } = useForm({ mode: 'onChange' });

  const onSubmit = async (data: FieldValues | { newText: string }) => {
    try {
      const response = (await CommentsFetch.fetchChangeCommentText({
        commentId,
        newText: data.newText,
      })) as IComment;
      setCommentText(response.text);
      if (closeModal) closeModal();
    } catch (error) {
      toast('Server error, sory :(');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        name="newText"
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
        Change
      </Button>
    </form>
  );
};

export default ChangeCommentTextForm;

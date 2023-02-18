import { Button } from '@mui/material';
import { validationLengthPost } from 'helpers/validation-functions';
import { FieldValues, useForm } from 'react-hook-form';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';

import { useAppSelector } from 'store/custom-hooks/custom-hooks';
import { fetchCreateCommentsToPost } from 'helpers/fetch/comments-requests/createComment';
import { IComment } from 'store/slices/interfaces/posts-slice-interfaces';
import CustomInput from 'components/UI/CustomInput';

interface ICreateCommentForm {
  postId: string;
  setComments: Dispatch<SetStateAction<IComment[]>>;
  setHowCommentsShow: Dispatch<SetStateAction<number>>;
  allCommentsLength: number;
}

const CreateCommentForm = ({
  postId,
  setComments,
  setHowCommentsShow,
  allCommentsLength,
}: ICreateCommentForm) => {
  const { control, reset, handleSubmit } = useForm({ mode: 'onSubmit' });
  const userData = useAppSelector((state) => state.AuthorizationSlice.userData);

  const formRef = useRef<HTMLFormElement>(null);
  const isSubmitedForm = useRef(false);

  useEffect(() => {
    if (formRef.current) commentObserver.observe(formRef.current);
    return () => {
      if (formRef.current) commentObserver.unobserve(formRef.current);
    };
  }, []);

  const commentObserver = new IntersectionObserver((entrie) => {
    entrie.forEach((elem) => {
      if (!elem.isIntersecting && isSubmitedForm.current) {
        scrollToForm();
      }
      isSubmitedForm.current = false;
    });
  });

  const scrollToForm = () => {
    formRef.current!.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const onSubmit = async (data: FieldValues | { text: string }) => {
    isSubmitedForm.current = true;
    const newComment = {
      authorLogin: userData!.login,
      authorId: userData!.userId,
      postId: postId,
      text: data.text,
    };
    const response = await fetchCreateCommentsToPost(newComment);

    setComments((prev) => [...prev, response]);
    setHowCommentsShow(allCommentsLength + 1);
    reset();
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        name="text"
        control={control}
        label="Comment text"
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
        Add comment
      </Button>
    </form>
  );
};

export default CreateCommentForm;

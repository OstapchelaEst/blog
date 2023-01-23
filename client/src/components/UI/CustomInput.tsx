import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

type ICustomComponent = {
  name: string;
  control: Control<FieldValues>;
  rules?: {
    required?: true | false;
    validate?: {
      customFN: (value: string, formValues: FieldValues) => true | string;
    };
  };
} & TextFieldProps;

const CustomInput = ({ name, control, rules, ...otherProps }: ICustomComponent) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error, isTouched } }) => (
          <TextField
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value || ''}
            color={error ? 'error' : isTouched ? 'success' : 'primary'}
            focused={value ? true : false}
            helperText={error ? (error.message ? error.message : 'Обязательное поле') : ''}
            error={!!error}
            {...otherProps}
          />
        )}
      />
    </div>
  );
};

export default CustomInput;

import React from 'react';
import { FieldError, UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';

interface inputProps {
  label: string;
  fieldId: string;
  fieldType: string;
  registerReturn: UseFormRegisterReturn;
  error: FieldError | undefined;
  placeholder?: string;
  min?: string;
  max?: string;
}

const InputField = ({
  fieldId,
  label,
  fieldType,
  registerReturn,
  error,
  placeholder,
  min,
  max,
}: inputProps) => {
  return (
    <div className={'inputBlock'}>
      <label className={'inputLabel'} htmlFor={fieldId}>
        {label}
      </label>
      <input
        type={fieldType}
        id={fieldId}
        {...registerReturn}
        className={'input'}
        placeholder={placeholder}
        min={min}
        max={max}
      />
      <div className={'flex min-h-[14px] flex-col items-start'}>
        {error && <span className={'error'}>{error.message}</span>}
      </div>
    </div>
  );
};

export default InputField;

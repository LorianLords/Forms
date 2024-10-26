import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks.ts';
import { string } from 'yup';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface PasswordProps {
  password: string;
  triggerReturn: () => Promise<boolean>;
  errorPassword: FieldError | undefined;
  errorConfirmPass: FieldError | undefined;
  registerReturnPass: UseFormRegisterReturn;
  registerReturnConf: UseFormRegisterReturn;
}

const PasswordField = ({
  password,
  triggerReturn,
  errorPassword,
  errorConfirmPass,
  registerReturnPass,
  registerReturnConf,
}: PasswordProps) => {
  const [IsChanged, setIsChanged] = useState(false);

  useEffect(() => {
    console.log('f');
    if (IsChanged) {
      console.log('d');
      triggerReturn().then(() => {
        // Действия после успешной валидации
        console.log('Confirm password is valid');
      });
    }
  }, [password, IsChanged]);

  return (
    <div className={'inputBlock'}>
      <label className={'inputLabel'} htmlFor="password">
        Password*
      </label>
      <input
        type="password"
        id={'password'}
        {...registerReturnPass}
        className={'input'}
        onBlur={() => setIsChanged(true)}
      />
      <input
        type="password"
        id={'confirm_password'}
        {...registerReturnConf}
        className={'input mt-2'}
        placeholder={'Confirm Password'}
      />
      <div className={'flex min-h-[50px] flex-col items-start'}>
        {errorPassword && <span className={'error'}>{errorPassword.message}</span>}

        {errorConfirmPass && <span className={'error'}>{errorConfirmPass.message}</span>}
      </div>
    </div>
  );
};

export default PasswordField;

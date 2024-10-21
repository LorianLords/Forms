import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { country_List } from '../Types/consts.ts';
import { countryType, FormData } from '../Types/types.ts';
import { setData } from '../store/formSlice.ts';
import Select from 'react-select';
import CountryFlag from 'react-country-flag';
import log from 'eslint-plugin-react/lib/util/log';

const countryList: countryType[] = [
  { value: 'US', label: 'United States', code: 'US' },
  { value: 'GB', label: 'United Kingdom', code: 'GB' },
  { value: 'FR', label: 'France', code: 'FR' },
  { value: 'DE', label: 'Germany', code: 'DE' },
  // Добавьте остальные страны по необходимости
];

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters long'),
  age: Yup.number()
    .transform((value, originalValue) => {
      return originalValue.trim() === '' ? null : value;
    })
    .min(5)
    .max(120)
    .required('Age is required'),
  email: Yup.string().email('Enter email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required')
    .test('hasNumber', 'Password must contain at least 1 number', (value) =>
      /[0-9]/.test(value),
    )
    .test('hasUpperCase', 'Password must contain at least 1 capital letter', (value) =>
      /[A-Z]/.test(value),
    )
    .test('hasLowerCase', 'Password must contain at least 1 lowercase letter', (value) =>
      /[a-z]/.test(value),
    )
    .test('hasSpecialChar', 'Password must contain at least 1 special Char', (value) =>
      /[@$!%*?&#]/.test(value),
    ),
  confirmPassword: Yup.string()
    .min(6, 'Password must contain at least 6 characters long')
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  sex: Yup.string()
    .oneOf(['male', 'female', 'other'] as const)
    .defined(),
  agreeToTerms: Yup.bool()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must agree to the terms'),
  picture: Yup.mixed<FileList>()
    .required('Picture is required')
    .test('FileSize', 'The file is too large', (value) => {
      const files = value as FileList;
      return files && files.length > 0 && files[0].size <= 2 * 1024 * 1024; // Ограничение на размер файла 5MB
    })
    .test('FileType', 'File must be Jpeg or PNG format', (value) => {
      const files = value as FileList;
      return (
        files && files.length > 0 && ['image/jpeg', 'image/png'].includes(files[0].type)
      );
    }),
  country: Yup.object()
    .shape({
      value: Yup.string().required(),
      label: Yup.string().required(),
      code: Yup.string().required(),
    })
    .nullable()
    .required('Country is required'),
});

const ConForm = () => {
  const {
    register,
    watch,
    trigger,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      sex: 'male',
    },
  });
  const [IsChanged, setIsChanged] = useState(false);
  const [inputValue, setInputValue] = useState(''); // Состояние для inputValue

  const onInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  const dispatch = useAppDispatch();
  const onSubmit = (data: FormData) => {
    console.log('End');
    console.log(data);
    dispatch(setData(data));
    alert(`Submitted data: ${data.name}`);
  };

  const password = watch('password'); // Следим за полем password
  const { countries } = useAppSelector((state) => state.forms);
  useEffect(() => {
    if (IsChanged) {
      trigger('confirmPassword').then(() => {
        // Действия после успешной валидации
      });
    }
  }, [password, trigger]);

  return (
    <div
      className={
        'mx-auto mb-4 w-[600px] rounded-lg p-10 px-14 font-roboto text-2xl shadow-lg sm:bg-red-300 md:bg-blue-300 lg:bg-white'
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={'inputBlock'}>
          <label className={'inputLabel'} htmlFor="name">
            Name
          </label>
          <input type="text" id={'name'} {...register('name')} className={'input'} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div className={'inputBlock'}>
          <label className={'inputLabel'} htmlFor="age">
            Age
          </label>
          <input
            type="number"
            id={'age'}
            {...register('age')}
            className={'input'}
            min="5"
            max="120"
          />
          {errors.age && <span>{errors.age.message}</span>}
        </div>
        <div className={'inputBlock'}>
          <label className={'inputLabel'} htmlFor="email">
            {' '}
            Email
          </label>
          <input
            type="email"
            id={'email'}
            placeholder={'example@gmail.com'}
            {...register('email')}
            className={'input'}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className={'inputBlock'}>
          <label className={'inputLabel'} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id={'password'}
            {...register('password')}
            className={'input'}
            onBlur={() => setIsChanged(true)}
          />
          <input
            type="password"
            id={'confirm_password'}
            {...register('confirmPassword')}
            className={'input'}
            placeholder={'Confirm Password'}
          />
          {errors.password && <span>{errors.password.message}</span>}
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </div>
        <div className={'flex flex-col'}>
          <label className={'inputLabel mx-4 text-left'} htmlFor="country">
            Select Country
          </label>
          <Controller
            name={'country'}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value || null} // Передаем объект countryType или null, если ничего не выбрано
                onChange={(selectedOption) => field.onChange(selectedOption)} // Передаем объект в onChange
                options={countryList}
                inputValue={inputValue} // Передаем inputValue
                onInputChange={onInputChange} // Передаем обработчик
                onMenuOpen={() => console.log('menu open')} // Обработчик открытия меню
                onMenuClose={() => console.log('menu close')}
                formatOptionLabel={(country: countryType) => (
                  <div className={'flex items-center space-x-2'}>
                    <CountryFlag
                      countryCode={country.code}
                      svg
                      style={{ width: '20px', height: '20px' }}
                    />
                    <span>{country.label}</span>
                  </div>
                )}
                placeholder={'Select Country...'}
                classNamePrefix={'react-select'}
                className={'m-2 mb-4 pl-2'}
                isClearable
              />
            )}
          />
          {errors.country && <span>{errors.country.message}</span>}
        </div>
        <div className={'m-4 my-2 flex flex-col items-start space-y-4'}>
          <label className={'inline-flex cursor-pointer items-center'} htmlFor="male">
            <input
              className={'peer hidden'}
              type="radio"
              value={'male'}
              id={'male'}
              {...register('sex', { required: true })}
            />
            <div className="h-5 w-5 rounded-full border border-gray-300 bg-white peer-checked:border-transparent peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500"></div>
            <span className="ml-2 text-gray-700">Male</span>
          </label>
          <label className={'inline-flex cursor-pointer items-center'} htmlFor="female">
            <input
              className={'peer hidden'}
              type="radio"
              value={'female'}
              id={'female'}
              {...register('sex')}
            />
            <div className="h-5 w-5 rounded-full border border-gray-300 bg-white peer-checked:border-transparent peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500"></div>
            <span className="ml-2 text-gray-700">Female</span>
          </label>
          <label className={'inline-flex cursor-pointer items-center'} htmlFor="other">
            <input
              className={'peer hidden'}
              type="radio"
              value={'other'}
              id={'other'}
              {...register('sex')}
            />
            <div className="h-5 w-5 rounded-full border border-gray-300 bg-white peer-checked:border-transparent peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500"></div>
            <span className="ml-2 text-gray-700">Other</span>
          </label>
        </div>
        <div className={'inputBlock'}>
          <label className={'inputLabel'} htmlFor="agreeToTerms">
            <input type="checkbox" id={'agreeToTerms'} {...register('agreeToTerms')} />I
            agree to the Terms and Conditions
          </label>
          {errors.agreeToTerms && <span>{errors.agreeToTerms.message}</span>}
        </div>
        <div className={'p-3'}>
          <label htmlFor="uploadPicture">Upload picture: </label>
          <Controller
            name={'picture'}
            control={control}
            render={({ field }) => (
              <input
                type="file"
                id={'picture'}
                accept={'image/jpeg, image/png'}
                onChange={(e) => {
                  field.onChange(e.target.files);
                  field.ref(e.target);
                }}
              />
            )}
          />
          {errors.picture && <span>{errors.picture.message}</span>}
        </div>

        <button
          className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default ConForm;

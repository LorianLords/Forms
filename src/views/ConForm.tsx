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
import { FiUpload } from 'react-icons/fi';

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
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  sex: Yup.string()
    .oneOf(['male', 'female', 'other'] as const)
    .defined(),
  agreeToTerms: Yup.bool()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must agree to the terms'),
  picture: Yup.mixed<FileList>()
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
    formState: { errors, isValid },
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
        'mx-auto mb-4 w-[600px] rounded-lg border border-gray-200 p-10 px-14 font-roboto text-2xl shadow-2xl sm:bg-red-300 md:bg-blue-300 lg:bg-white'
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={'inputBlock'}>
          <label className={'inputLabel'} htmlFor="name">
            Name*
          </label>
          <input type="text" id={'name'} {...register('name')} className={'input'} />
          <div className={'min-h-[32px]'}>
            {errors.name && <span className={'error'}>{errors.name.message}</span>}
          </div>
        </div>
        <div className={'inputBlock'}>
          <label className={'inputLabel'} htmlFor="age">
            Age*
          </label>
          <input
            type="number"
            id={'age'}
            {...register('age')}
            className={'input'}
            min="5"
            max="120"
          />
          <div className={'min-h-[32px]'}>
            {errors.age && <span className={'error'}>{errors.age.message}</span>}
          </div>
        </div>
        <div className={'inputBlock'}>
          <label className={'inputLabel'} htmlFor="email">
            Email*
          </label>
          <input
            type="email"
            id={'email'}
            placeholder={'example@gmail.com'}
            {...register('email')}
            className={'input'}
          />
          <div className={'min-h-[32px]'}>
            {errors.email && <span className={'error'}>{errors.email.message}</span>}
          </div>
        </div>

        <div className={'inputBlock'}>
          <label className={'inputLabel'} htmlFor="password">
            Password*
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
            className={'input mt-2'}
            placeholder={'Confirm Password'}
          />
          <div className={'flex min-h-[50px] flex-col items-start'}>
            {errors.password && (
              <span className={'error'}>{errors.password.message}</span>
            )}

            {errors.confirmPassword && (
              <span className={'error'}>{errors.confirmPassword.message}</span>
            )}
          </div>
        </div>

        <div className={'flex flex-col'}>
          <label className={'inputLabel mx-3 text-left'} htmlFor="country">
            Select Country*
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
                className={'m-1 mb-4 pl-4 pr-1'}
                isClearable
              />
            )}
          />
          {errors.country && <span>{errors.country.message}</span>}
        </div>

        <div className={'m-4 my-3 flex flex-col items-start space-y-2'}>
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

        <div className={'inputBlock items-center'}>
          <Controller
            name={'picture'}
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="file"
                  id={'picture'}
                  accept={'image/jpeg, image/png'}
                  onChange={(e) => {
                    field.onChange(e.target.files);
                    field.ref(e.target);
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="picture"
                  className="flex h-32 w-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-center hover:border-blue-500 focus:border-blue-500"
                >
                  <FiUpload className="mb-2 text-3xl text-gray-500" />
                  {field.value && field.value.length > 0 ? (
                    <span className="text-gray-700">{field.value[0].name}</span>
                  ) : (
                    <>
                      <span className="text-gray-700">Click to upload photo</span>
                      <span className="text-sm text-gray-500">JPEG or PNG, max 2MB</span>
                    </>
                  )}
                </label>
              </>
            )}
          />
          <div className={'min-h-[24px]'}>
            {errors.picture && <span className={'error'}>{errors.picture.message}</span>}
          </div>
        </div>

        <div className={'mx-2 mb-2 mt-2 items-center space-x-2'}>
          <label
            className={
              'flex cursor-pointer items-center font-inter text-2xl font-normal text-gray-800'
            }
            htmlFor="agreeToTerms"
          >
            <input
              type="checkbox"
              id={'agreeToTerms'}
              className={'peer hidden'}
              {...register('agreeToTerms')}
            />
            <div
              className={
                'ml-6 mr-3 h-5 w-5 cursor-pointer rounded border-2 border-gray-300 bg-white peer-checked:border-transparent' +
                ' peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500'
              }
            >
              <svg
                className="h-4 w-4 text-white peer-checked:block"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            I agree to the Terms and Conditions
          </label>
          <div className={'flex min-h-[24px] items-center justify-center text-base'}>
            {errors.agreeToTerms && (
              <span className={'error'}>{errors.agreeToTerms.message}</span>
            )}
          </div>
        </div>

        <button
          className={`rounded-lg px-4 py-4 font-bold focus:outline-none focus:ring-2 ${
            !Object.keys(errors).length
              ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
              : 'cursor-not-allowed bg-gray-400 text-gray-300'
          }`}
          type="submit"
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default ConForm;

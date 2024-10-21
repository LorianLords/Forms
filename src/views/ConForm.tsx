import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { country_List } from '../Types/consts.ts';
import { FormData } from '../Types/types.ts';
import { setData } from '../store/formSlice.ts';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters long'),
  age: Yup.number().min(5).max(120).required('Age is required'),
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
  country: Yup.string()
    .required('Country is required')
    .oneOf(country_List, 'You must choose one of the available countries'),
});

const ConForm = () => {
  const {
    register,
    watch,
    trigger,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(validationSchema), mode: 'onChange' });

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
    trigger('confirmPassword').then(() => {
      // Действия после успешной валидации
    });
  }, [password, trigger]);

  return (
    <div
      className={
        'mx-auto mb-4 max-w-md rounded-lg p-6 text-2xl shadow-lg sm:bg-red-300 md:bg-blue-300 lg:bg-gray-300'
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={'p-6'}>
          <label htmlFor="name"> Name:</label>
          <input type="text" id={'name'} {...register('name')} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div className={'p-6 font-semibold'}>
          <label htmlFor="age"> Age:</label>
          <input type="number" id={'age'} {...register('age')} />
          {errors.age && <span>{errors.age.message}</span>}
        </div>
        <div className={'p-6'}>
          <label htmlFor="email"> Email:</label>
          <input
            type="email"
            id={'email'}
            placeholder={'example@gmail.com'}
            {...register('email')}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className={'p-6'}>
          <label htmlFor="password"> Password:</label>
          <input type="password" id={'password'} {...register('password')} />
          <input
            type="password"
            id={'confirm_password'}
            {...register('confirmPassword')}
          />
          {errors.password && <span>{errors.password.message}</span>}
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </div>
        <div className={'p-6'}>
          <div>
            <label htmlFor="male">
              <input
                type="radio"
                checked={true}
                value={'male'}
                id={'male'}
                {...register('sex')}
              />
              Male
            </label>
          </div>
          <div>
            <label htmlFor="Female">
              <input type="radio" value={'female'} id={'female'} {...register('sex')} />
              Female
            </label>
          </div>
          <div>
            <label htmlFor="Other">
              <input type="radio" value={'other'} id={'other'} {...register('sex')} />
              Other
            </label>
          </div>
        </div>
        <div className={'p-3'}>
          <label htmlFor="agreeToTerms">
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
        <div className={'p-6'}>
          <label htmlFor="country">Select Country:</label>
          <Controller
            name={'country'}
            control={control}
            render={({ field }) => (
              <input
                type="text"
                id="country"
                list="countryList"
                {...field}
                value={field.value || ''} // Устанавливаем текущее значение или пустую строку
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                onInput={(e) => {
                  field.onChange(e.currentTarget.value); // Обновляем значение при каждом вводе
                }}
              />
            )}
          />
          <datalist id={'countryList'}>
            <option value="Turkmenistan"></option>
            {countries.map((country) => (
              <option key={country} value={country}></option>
            ))}
          </datalist>
          {errors.country && <span>{errors.country.message}</span>}
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default ConForm;

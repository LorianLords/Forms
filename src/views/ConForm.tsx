import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAppDispatch } from '../store/hooks.ts';
import { DataTypes, FormTypes } from '../Types/types.ts';
import { setData, setNewState } from '../store/formSlice.ts';

import InputField from '../components/formComponents/InputField.tsx';
import PasswordField from '../components/formComponents/PasswordField.tsx';
import SelectCountry from '../components/formComponents/SelectCountry.tsx';
import GenderRadio from '../components/formComponents/GenderRadio.tsx';
import FileInput from '../components/formComponents/FileInput.tsx';
import CheckboxTerm from '../components/formComponents/CheckboxTerm.tsx';
import { useNavigate } from 'react-router-dom';
import { string } from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters long'),
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
    .test('hasNumber', 'Password must contain at least 1 number', (value) => /[0-9]/.test(value))
    .test('hasUpperCase', 'Password must contain at least 1 capital letter', (value) => /[A-Z]/.test(value))
    .test('hasLowerCase', 'Password must contain at least 1 lowercase letter', (value) => /[a-z]/.test(value))
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
      console.log(value as FileList);
      if (value) {
        const files = value as FileList;
        return files && files.length > 0 && files[0].size <= 2 * 1024 * 1024; // Ограничение на размер файла 5MB
      }
      return true;
    })
    .test('FileType', 'File must be Jpeg or PNG format', (value) => {
      console.log(value as FileList);
      if (value) {
        const files = value as FileList;
        return files && files.length > 0 && ['image/jpeg', 'image/png'].includes(files[0].type);
      }
      return true;
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
  } = useForm<FormTypes>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      sex: 'male',
    },
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: FormTypes) => {
    console.log('End');
    console.log(data);
    dispatch(setNewState(true));
    const base64String = await pictureToBase64(data.picture as FileList);
    console.log('Base64', base64String);
    const updateData: DataTypes = {
      ...data,
      picture: base64String as string,
    };
    dispatch(setData(updateData));
    navigate('/');
  };

  const password = watch('password'); // Следим за полем password

  const pictureToBase64 = (file: FileList) => {
    if (file && file.length > 0) {
      try {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file[0]);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      } catch (error) {
        console.error('Ошибка при конвертации файла в Base64:', error);
      }
    }
  };
  return (
    <div
      className={
        'mx-auto mb-2 w-3/4 rounded-lg border border-gray-200 bg-gray-200 px-3 py-2 font-roboto shadow-2xl sm:px-5 sm:py-5 md:bg-blue-200 lg:bg-white' +
        ' xs:p-5 xs:w-[370px] md:h-auto md:text-xl'
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col items-center'}>
        <InputField
          label={'Name*'}
          fieldId={'name'}
          fieldType={'text'}
          registerReturn={register('name')}
          error={errors.name}
        />
        <InputField
          label={'Age*'}
          fieldId={'age'}
          fieldType={'number'}
          registerReturn={register('age')}
          error={errors.age}
          min={'5'}
          max={'120'}
        />

        <InputField
          label={'Email*'}
          fieldId={'email'}
          fieldType={'email'}
          registerReturn={register('email')}
          placeholder={'example@gmail.com'}
          error={errors.email}
        />

        <PasswordField
          password={password}
          triggerReturn={() => trigger('confirmPassword')}
          errorPassword={errors.password}
          errorConfirmPass={errors.confirmPassword}
          registerReturnPass={register('password')}
          registerReturnConf={register('confirmPassword')}
        />

        <div className={'flex w-full flex-col items-start px-3 md:text-xl'}>
          <label className={'inputLabel'} htmlFor="country">
            Select Country*
          </label>
          <Controller
            name={'country'}
            control={control}
            render={({ field }) => <SelectCountry {...field} />}
          />
          <div className={'flex items-start pl-1'}>
            {errors.country && <span className={'error'}>{errors.country.message}</span>}
          </div>
        </div>

        <div
          className={
            'xs:text-sm m-4 my-3 mb-0 flex w-full flex-col items-start space-y-1 px-1 text-[10px] sm:text-sm md:px-3 md:text-base'
          }
        >
          <GenderRadio id={'male'} value={'Male'} registerReturn={register('sex', { required: true })} />
          <GenderRadio id={'female'} value={'Female'} registerReturn={register('sex')} />
          <GenderRadio id={'other'} value={'Other'} registerReturn={register('sex')} />
        </div>

        <div className={'flex w-full flex-col items-center md:mt-1'}>
          <Controller
            name={'picture'}
            control={control}
            render={({ field }) => (
              <FileInput
                value={field.value as FileList} // Текущее значение файла
                onChange={field.onChange} // Обработчик изменения файла
                onBlur={field.onBlur} // Обработчик потери фокуса
                ref={field.ref} // Ссылка на элемент
              />
            )}
          />
          <div className={'min-h-[13px]'}>
            {errors.picture && <span className={'error'}>{errors.picture.message}</span>}
          </div>
        </div>

        <CheckboxTerm registerReturn={register('agreeToTerms')} error={errors.agreeToTerms} />

        <button
          className={`w-1/2 rounded-lg p-2 text-[10px] font-bold focus:outline-none focus:ring-2 sm:text-sm ${
            !Object.keys(errors).length
              ? 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-blue-500'
              : 'cursor-not-allowed bg-gray-400 text-gray-300'
          }`}
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default ConForm;

import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import React, { ReactEventHandler, useEffect, useRef, useState } from 'react';
import Select, { GroupBase } from 'react-select';
import { countryType, DataTypes, unFormTypes } from '../Types/types.ts';
import CountryFlag from 'react-country-flag';
import GenderRadio from '../components/formComponents/GenderRadio.tsx';
import { FiUpload } from 'react-icons/fi';
import CheckboxTerm from '../components/formComponents/CheckboxTerm.tsx';
import { boolean, string } from 'yup';
import '../index.css';
import { validationSchema } from '../Types/YupSchema.ts';
import * as Yup from 'yup';
import { setData, setNewState } from '../store/formSlice.ts';
import { pictureToBase64 } from '../Types/FileIntoBase64.ts';
import { default_image } from '../Types/consts.ts';
import { useNavigate } from 'react-router-dom';
import { FieldError } from 'react-hook-form';
export const Schema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters long'),
});

const UnForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const fileInRef = useRef<HTMLInputElement>(null);
  const { countries } = useAppSelector((state) => state.forms);
  const termsRef = useRef<HTMLInputElement>(null);
  const [selectedCountry, setSelectedCountry] = useState<countryType | undefined>(undefined);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [fileName, setFileName] = useState('');
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);
  const otherRef = useRef<HTMLInputElement>(null);
  const handleFileChange = () => {
    const file = fileInRef.current?.files?.[0];
    if (file) {
      setFileName(file.name); // Устанавливаем имя файла в состоянии
    }
  };
  const handleCountryChange = (option: countryType | undefined) => {
    setSelectedCountry(option);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataTransfer = new DataTransfer();
    if (fileInRef.current?.files?.[0] !== undefined) {
      dataTransfer.items.add(fileInRef.current?.files?.[0]);
      console.log(dataTransfer.files[0]);
    }

    const data: unFormTypes = {
      name: nameRef.current?.value,
      age: ageRef.current?.value ? parseInt(ageRef.current?.value) : '',
      email: emailRef.current?.value,
      password: passwordRef.current?.value || undefined,
      confirmPassword: confirmPasswordRef.current?.value,
      sex: maleRef.current?.checked
        ? 'male'
        : femaleRef.current?.checked
          ? 'female'
          : otherRef.current?.checked
            ? 'other'
            : undefined,
      country: selectedCountry,
      picture: dataTransfer.files.length ? dataTransfer.files : undefined,
      agreeToTerms: termsRef.current?.checked,
    };
    console.log('********************************');
    console.log(data.age);

    try {
      await validationSchema.validate(data, { abortEarly: false });
      setErrors({});
      console.log('Форма успешно отправлена:', data);
      const validatedData = data as DataTypes;
      dispatch(setNewState(true));

      const base64String = await pictureToBase64(data.picture as FileList);

      console.log('Base64', base64String);
      const updateData: DataTypes = {
        ...validatedData,
        picture: (base64String as string) || default_image,
      };
      console.log(updateData);
      dispatch(setData(updateData as DataTypes));
      navigate('/');
    } catch (validationErrors) {
      const formattedErrors: { [key: string]: string } = {};
      console.log(validationErrors);
      if (validationErrors instanceof Yup.ValidationError) {
        console.log(validationErrors.inner);
        validationErrors.inner.forEach((error) => {
          if (error.path && !formattedErrors[error.path]) formattedErrors[error.path] = error.message;
          console.log(error.message);
        });
        setErrors(formattedErrors);
      }
      console.log(errors);
    }
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div
      className={
        'mx-auto mb-2 w-3/4 rounded-lg border border-yellow-200 bg-yellow-200 px-3 py-2 font-roboto shadow-2xl sm:px-5 sm:py-5 lg:bg-yellow-100' +
        ' xs:w-[370px] xs:p-5 md:h-auto md:text-xl'
      }
    >
      <form onSubmit={handleSubmit} className={'flex flex-col items-center'}>
        <div className={'inputBlock'}>
          <label className={'inputLabel'} htmlFor={'name'}>
            Name
          </label>
          <input type={'text'} id={'name'} className={'input'} ref={nameRef} />
          <div className={'flex min-h-[14px] flex-col items-start'}>
            {errors && <span className={'error'}>{errors.name}</span>}
          </div>
        </div>
        <div className={'inputBlock'}>
          <label className={'flex min-h-[14px] flex-col items-start'} htmlFor={'age'}>
            Age
          </label>
          <input type={'number'} id={'age'} className={'input'} min={5} max={120} ref={ageRef} />
          <div className={'flex min-h-[14px] flex-col items-start'}>
            {errors && <span className={'error'}>{errors.age}</span>}
          </div>
        </div>
        <div className={'inputBlock'}>
          <label className={'inputLabel'} htmlFor={'email'}>
            Email
          </label>
          <input
            type={'text'}
            id={'email'}
            className={'input'}
            placeholder={'example@gmail.com'}
            ref={emailRef}
          />
          <div className={'flex min-h-[14px] flex-col items-start'}>
            {errors && <span className={'error'}>{errors.email}</span>}
          </div>
        </div>
        <div className={'inputBlock'}>
          <label className={'inputLabel'} htmlFor="password">
            Password*
          </label>
          <input type="password" id={'password'} className={'input'} ref={passwordRef} />
          <input
            type="password"
            id={'confirm_password'}
            className={'input mt-2'}
            placeholder={'Confirm Password'}
            ref={confirmPasswordRef}
          />
          <div className={'flex min-h-[26px] flex-col items-start'}>
            {errors.password && <span className={'error'}>{errors.password}</span>}
            {errors.confirmPassword && <span className={'error'}>{errors.confirmPassword}</span>}
          </div>
        </div>
        <div className={'flex w-full flex-col items-start px-3 md:text-xl'}>
          <label className={'inputLabel'} htmlFor="country">
            Select Country
          </label>
          <Select
            options={countries}
            className={'w-full pr-1 text-[10px] sm:mx-1 sm:text-base'}
            id={'country'}
            placeholder={'Choose country'}
            formatOptionLabel={(country: countryType) => (
              <div className={'flex items-center space-x-2'}>
                <CountryFlag countryCode={country.code} svg className={'h-[10px] w-[10px]'} />
                <span>{country.label}</span>
              </div>
            )}
            classNamePrefix={'react-select'}
            onChange={(value) => handleCountryChange(value as countryType)}
            isClearable
          />
          <div className={'flex min-h-[12px] flex-col items-start pl-1'}>
            {errors.country && <span className={'error'}>{errors.country}</span>}
          </div>
        </div>

        <div
          className={
            'm-4 my-1.5 mb-0 flex w-full flex-col items-start space-y-1 px-1 text-[10px] xs:text-sm sm:text-sm md:px-3 md:text-base'
          }
        >
          <label className={'inline-flex cursor-pointer items-center'} htmlFor={'male'}>
            <input
              className={'mr-1 h-2 w-2 md:h-4 md:w-4'}
              type="radio"
              value={'male'}
              name={'sex'}
              id={'male'}
              ref={maleRef}
              defaultChecked
            />
            Male
          </label>
          <label className={'inline-flex cursor-pointer items-center'} htmlFor={'female'}>
            <input
              className={'mr-1 h-2 w-2 md:h-4 md:w-4'}
              type="radio"
              value={'female'}
              name={'sex'}
              id={'female'}
              ref={femaleRef}
            />
            Female
          </label>
          <label className={'inline-flex cursor-pointer items-center'} htmlFor={'other'}>
            <input
              className={'mr-1 h-2 w-2 md:h-4 md:w-4'}
              type="radio"
              value={'other'}
              name={'sex'}
              id={'other'}
              ref={otherRef}
            />{' '}
            Other
          </label>
        </div>
        <div className={'flex w-full flex-col items-center md:mt-1'}>
          <input
            type="file"
            id={'picture'}
            accept={'image/jpeg, image/png'}
            className="hidden"
            onChange={handleFileChange}
            ref={fileInRef}
          />
          <label
            htmlFor="picture"
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-center text-[10px] hover:border-blue-500 focus:border-blue-500 md:h-24 md:w-48 md:text-base"
          >
            <FiUpload className="mb-2 text-3xl text-gray-500" />
            {fileName ? (
              <span className="text-sm text-gray-700">{fileName}</span>
            ) : (
              <>
                <span className="text-gray-700">Click to upload photo</span>
                <span className="text-[10px] text-gray-500 sm:text-sm">JPEG or PNG, max 2MB</span>
              </>
            )}
          </label>
          <div className={'min-h-[13px]'}>
            {errors.picture && <span className={'error'}>{errors.picture}</span>}
          </div>
        </div>
        <CheckboxTerm checkRef={termsRef} error={errors.agreeToTerms} />

        <button
          type="submit"
          className={`w-1/2 rounded-lg bg-orange-500 p-2 text-[10px] font-bold text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm`}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default UnForm;

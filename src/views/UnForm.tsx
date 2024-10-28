import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import React, { useRef, useState } from 'react';
import Select, { GroupBase } from 'react-select';
import { countryType, DataTypes, unFormTypes } from '../Types/types.ts';
import CountryFlag from 'react-country-flag';
import GenderRadio from '../components/formComponents/GenderRadio.tsx';
import { FiUpload } from 'react-icons/fi';
import CheckboxTerm from '../components/formComponents/CheckboxTerm.tsx';
import { boolean } from 'yup';

const UnForm = () => {
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

    const gender = maleRef.current?.checked;
    console.log(gender);
    const data: unFormTypes = {
      name: nameRef.current?.value,
      age: ageRef.current?.value ? parseInt(ageRef.current?.value) : undefined,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      sex: maleRef.current?.checked
        ? 'male'
        : femaleRef.current?.checked
          ? 'female'
          : otherRef.current?.checked
            ? 'other'
            : undefined,
      country: selectedCountry,
      picture: fileInRef.current?.files?.[0],
      agreeToTerms: Boolean(termsRef.current?.value),
    };
    console.log('********************************');
    console.log(data);
  };

  return (
    <div
      className={
        'mx-auto mb-4 w-[600px] rounded-lg border border-gray-200 p-10 px-14 font-roboto text-2xl shadow-2xl sm:bg-red-300 md:bg-blue-300 lg:bg-white'
      }
    >
      <form onSubmit={handleSubmit}>
        <div className={'inputBlock'}>
          <label className={'inputLabel'} htmlFor={'name'}>
            Name
          </label>
          <input type={'text'} id={'name'} className={'input'} ref={nameRef} />
          <div className={'min-h-[32px]'}>
            {/* {error && <span className={'error'}>{error.message}</span>}*/}
          </div>
        </div>
        <div className={'inputBlock'}>
          <label className={'inputLabel'} htmlFor={'age'}>
            Age
          </label>
          <input type={'number'} id={'age'} className={'input'} min={5} max={120} ref={ageRef} />
          <div className={'min-h-[32px]'}>
            {/* {error && <span className={'error'}>{error.message}</span>}*/}
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
          <div className={'min-h-[32px]'}>
            {/* {error && <span className={'error'}>{error.message}</span>}*/}
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
          <div className={'flex min-h-[50px] flex-col items-start'}>
            {/*    {errorPassword && <span className={'error'}>{errorPassword.message}</span>}
              {errorConfirmPass && <span className={'error'}>{errorConfirmPass.message}</span>}*/}
          </div>
        </div>
        <div className={'flex w-full flex-col items-start px-3'}>
          <label className={'inputLabel'} htmlFor="country">
            Select Country
          </label>
          <Select
            options={countries}
            id={'country'}
            placeholder={'Choose country'}
            formatOptionLabel={(country: countryType) => (
              <div className={'flex items-center space-x-2'}>
                <CountryFlag countryCode={country.code} svg style={{ width: '20px', height: '20px' }} />
                <span>{country.label}</span>
              </div>
            )}
            classNamePrefix={'react-select'}
            className={'m-1 mb-0 w-full pl-1 pr-1'}
            onChange={(value) => handleCountryChange(value as countryType)}
            isClearable
          />
        </div>
        <div className={'m-4 my-3 flex flex-col items-start space-y-2'}>
          <label className={'inline-flex cursor-pointer items-center'} htmlFor={'male'}>
            <input
              className={'mr-1 h-5 w-5'}
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
              className={'mr-1 h-5 w-5'}
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
              className={'mr-1 h-5 w-5'}
              type="radio"
              value={'other'}
              name={'sex'}
              id={'other'}
              ref={otherRef}
            />{' '}
            Other
          </label>
        </div>
        <div className={'flex w-full flex-col items-center'}>
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
            className="flex h-32 w-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-center hover:border-blue-500 focus:border-blue-500"
          >
            <FiUpload className="mb-2 text-3xl text-gray-500" />
            {fileName ? (
              <span className="text-lg text-gray-700">{fileName}</span>
            ) : (
              <>
                <span className="text-gray-700">Click to upload photo</span>
                <span className="text-sm text-gray-500">JPEG or PNG, max 2MB</span>
              </>
            )}
          </label>
        </div>
        <div className={'mt-6'}>
          <CheckboxTerm checkRef={termsRef} />
        </div>

        <button
          className={`rounded-lg px-4 py-4 font-bold focus:outline-none focus:ring-2 ${
            /* !Object.keys(errors).length
              ?*/ 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-blue-500'
            /*: 'cursor-not-allowed bg-gray-400 text-gray-300'*/
          }`}
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default UnForm;

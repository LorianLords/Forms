import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { ForwardedRef } from 'react';

interface CheckboxProps {
  registerReturn?: UseFormRegisterReturn;
  error?: FieldError | undefined;
  checkRef?: ForwardedRef<HTMLInputElement>;
}

const CheckboxTerm = ({ registerReturn, error, checkRef }: CheckboxProps) => {
  return (
    <div className={'mx-2 mb-2 mt-2 items-center space-x-2'}>
      <label
        className={'flex cursor-pointer items-center font-inter text-2xl font-normal text-gray-800'}
        htmlFor="agreeToTerms"
      >
        <input
          type="checkbox"
          id={'agreeToTerms'}
          className={'peer hidden'}
          ref={checkRef}
          {...registerReturn}
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        I agree to the Terms and Conditions
      </label>
      <div className={'flex min-h-[24px] items-center justify-center text-base'}>
        {error && <span className={'error'}>{error.message}</span>}
      </div>
    </div>
  );
};

export default CheckboxTerm;

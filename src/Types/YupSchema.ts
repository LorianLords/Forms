import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters long'),
  age: Yup.number()
    .transform((value, originalValue) => {
      if (typeof originalValue === 'string' && originalValue.trim() === '') {
        return null;
      }
      return value;
    })
    .min(5)
    .max(120)
    .required('Age is required'),
  email: Yup.string().email('Enter email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
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
      console.log(value);
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
      value: Yup.string().required('Country is required'),
      label: Yup.string().required(),
      code: Yup.string().required(),
    })
    .test(
      'countryFields',
      'Country is required', // Сообщение об ошибке для всего объекта
      (value) => Boolean(value && value.value && value.label && value.code), // Проверяем все поля
    )
    .nullable(),
});

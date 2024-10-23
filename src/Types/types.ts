export type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  sex: 'male' | 'female' | 'other';
  agreeToTerms: boolean;
  picture?: FileList;
  country: countryType;
};

export interface countryType {
  value: string;
  label: string;
  code: string;
}

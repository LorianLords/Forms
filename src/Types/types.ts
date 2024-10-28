export type FormTypes = {
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

export type unFormTypes = {
  name: string | undefined;
  age: number | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  sex: 'male' | 'female' | 'other' | undefined;
  agreeToTerms: boolean | undefined;
  picture?: File | undefined;
  country: countryType | undefined;
};
export type DataTypes = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  sex: 'male' | 'female' | 'other';
  agreeToTerms: boolean;
  picture?: string;
  country: countryType;
};

export interface countryType {
  value: string;
  label: string;
  code: string;
}

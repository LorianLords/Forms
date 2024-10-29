import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
import Select, { PropsValue, SingleValue } from 'react-select';
import { countryType } from '../../Types/types.ts';
import CountryFlag from 'react-country-flag';
import React, { useState } from 'react';
import { useAppSelector } from '../../store/hooks.ts';

interface SelectCountryProps {
  value: PropsValue<countryType> | undefined;
  onChange: (value: SingleValue<countryType>) => void;
  onBlur: () => void;
}

const SelectCountry = ({ value, onChange, onBlur }: SelectCountryProps) => {
  const [inputValue, setInputValue] = useState(''); // Состояние для inputValue
  const { countries } = useAppSelector((state) => state.forms);
  const onInputChange = (newValue: string) => {
    setInputValue(newValue);
  };
  return (
    <Select
      onBlur={onBlur}
      value={value || undefined} // Передаем объект countryType или null, если ничего не выбрано
      onChange={(selectedOption) => onChange(selectedOption)} // Передаем объект в onChange
      options={countries}
      inputValue={inputValue} // Передаем inputValue
      onInputChange={onInputChange} // Передаем обработчик
      onMenuOpen={() => console.log('menu open')} // Обработчик открытия меню
      onMenuClose={() => console.log('menu close')}
      formatOptionLabel={(country: countryType) => (
        <div className={'flex items-center space-x-2'}>
          <CountryFlag countryCode={country.code} svg style={{ width: '20px', height: '20px' }} />
          <span>{country.label}</span>
        </div>
      )}
      placeholder={'Select Country...'}
      classNamePrefix={'react-select'}
      className={'w-full pr-1 text-[10px] sm:m-1 sm:text-base'}
      isClearable
    />
  );
};

export default SelectCountry;

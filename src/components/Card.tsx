import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { countryType, DataTypes, FormTypes } from '../Types/types.ts';
import { default_image } from '../Types/consts.ts';
import CountryFlag from 'react-country-flag';
import React, { useEffect, useRef, useState } from 'react';
import { setNewState } from '../store/formSlice.ts';

interface CardProps {
  data: DataTypes;
  id: number;
}

const Card = ({ data, id }: CardProps) => {
  const { newState, arrayData } = useAppSelector((state) => state.forms);
  const dispatch = useAppDispatch();
  const newCard = id === arrayData.length - 1 && newState;

  useEffect(() => {
    if (newState) {
      const timer = setTimeout(() => {
        dispatch(setNewState(false));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div
      className={`group relative m-4 h-[200px] w-[140px] rounded-xl bg-gradient-to-tl from-purple-300 via-blue-200 to-pink-300 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:duration-300 sm:h-[280px] sm:w-[200px] md:h-[320px] md:w-[230px] ${
        newCard ? 'scale-105 duration-1000' : 'scale-100'
      }`}
    >
      <div
        className={`absolute inset-0 z-10 rounded-xl bg-custom-green transition-opacity duration-1000 ease-in-out ${
          newCard ? 'opacity-40' : 'opacity-0'
        }`}
      ></div>

      <div
        className={'relative z-20 flex h-full w-full flex-col items-center p-0.5 text-sm font-medium sm:p-3'}
      >
        <img
          className={
            'm-1 h-20 w-20 rounded-full border-4 border-orange-500 object-cover shadow-md sm:h-32 sm:w-32 sm:border-6 md:mb-4'
          }
          src={data.picture || default_image}
          alt=""
        />
        <div className={'mb-2 text-center'}>
          <h1 className={'text-lg font-bold text-gray-900 md:mb-1 md:text-3xl'}>{data.name}</h1>
          <p className={'text-sm leading-none text-gray-600 sm:mb-1 sm:text-lg'}>
            {data.age} years old, {data.sex}
          </p>
        </div>

        <div className={'w-full pl-3 text-start text-[12px] sm:mt-3 sm:text-sm'}>
          <p className={'text-md text-gray-600 md:mb-1'}>{data.email}</p>
          <div className={'flex items-center'}>
            <CountryFlag
              className={''}
              countryCode={data.country.code}
              svg
              style={{ width: '20px', height: '20px' }}
            />
            <span className={'text-md mx-2 text-gray-600'}>{data.country.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

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
      className={`group relative m-4 h-[420px] w-[320px] rounded-xl bg-gradient-to-tl from-purple-300 via-blue-200 to-pink-300 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:duration-300 ${
        newCard ? 'scale-105 duration-1000' : 'scale-100'
      }`}
    >
      <div
        className={`bg-custom-green absolute inset-0 z-10 rounded-xl transition-opacity duration-1000 ease-in-out ${
          newCard ? 'opacity-40' : 'opacity-0'
        }`}
      ></div>

      <div className={'relative z-20 flex h-full w-[320px] flex-col items-center p-4 text-xl font-medium'}>
        <img
          className={'mb-4 h-52 w-52 rounded-full border-6 border-orange-500 object-cover shadow-md'}
          src={data.picture || default_image}
          alt=""
        />
        <div className={'text-center'}>
          <p className={'mb-1 text-3xl font-bold text-gray-900'}>{data.name}</p>
        </div>
        <p className={'text-md mb-1 text-gray-600'}>
          {data.age} years old, {data.sex}
        </p>
        <div className={'mt-5 w-full pl-3 text-start'}>
          <p className={'text-md mb-1 text-gray-600'}>{data.email}</p>
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

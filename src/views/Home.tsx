import uniqueSentence from '../task1.ts';
import { useAppSelector } from '../store/hooks.ts';
import React from 'react';
import Card from '../components/Card.tsx';

const Home = () => {
  const { arrayData } = useAppSelector((state) => state.forms);

  return (
    <div className="flex h-full w-full flex-row flex-wrap items-start overflow-hidden pb-20 sm:px-4 lg:px-8">
      {arrayData && arrayData.map((item, index) => <Card data={item} key={index} id={index} />)}
    </div>
  );
};

export default Home;

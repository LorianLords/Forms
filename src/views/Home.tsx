import uniqueSentence from '../task1.ts';
import { useAppSelector } from '../store/hooks.ts';

const Home = () => {
  const { data } = useAppSelector((state) => state.forms);

  return (
    <div>
      <div>
        {data && (
          <div>
            <p>{data.name}</p>
            <p>{data.age}</p>
            <p>{data.email}</p>
            <p>{data.sex}</p>
            <p>{data.country.label}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

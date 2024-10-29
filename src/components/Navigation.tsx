import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div
      className={
        'md: mb-1 flex w-full max-w-4xl items-center justify-between p-6 pb-3 font-inter text-orange-500 md:mb-1 md:w-[800px]'
      }
    >
      <div className="flex justify-end sm:flex-1">
        <Link className={'link'} to={'/'}>
          Sweet Home
        </Link>
      </div>
      <div className="flex justify-center text-center sm:flex-1">
        <Link className={'link'} to={'/uncontrolledform'}>
          Uncontrolled Form
        </Link>
      </div>
      <div className="flex justify-start sm:flex-1">
        <Link className={'link'} to={'/form'}>
          Controlled Form
        </Link>
      </div>
    </div>
  );
};

export default Navigation;

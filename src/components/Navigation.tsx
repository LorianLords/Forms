import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div
      className={'w-132 flex items-center justify-between p-6 font-sans text-orange-500'}
    >
      <Link className={'link'} to={'/'}>
        Home
      </Link>
      <Link className={'link'} to={'/uncontrolledform'}>
        Uncontrolled Form
      </Link>
      <Link className={'link'} to={'/form'}>
        Controlled Form
      </Link>
    </div>
  );
};

export default Navigation;

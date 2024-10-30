import { Link, NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div
      className={
        'md: mb-1 flex w-full max-w-4xl items-center justify-between p-6 pb-3 font-inter text-orange-500 md:mb-1 md:w-[800px]'
      }
    >
      <div className="flex justify-end sm:flex-1">
        <NavLink className={({ isActive }) => (isActive ? 'active' : 'link')} to={'/'}>
          Sweet Home
        </NavLink>
      </div>
      <div className="flex justify-center text-center sm:flex-1">
        <NavLink className={({ isActive }) => (isActive ? 'active' : 'link')} to={'/uncontrolledform'}>
          Uncontrolled Form
        </NavLink>
      </div>
      <div className="flex justify-start sm:flex-1">
        <NavLink className={({ isActive }) => (isActive ? 'active' : 'link')} to={'/form'}>
          Controlled Form
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;

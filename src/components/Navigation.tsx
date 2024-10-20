import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <Link to={'/'}>Home</Link>
      <Link to={'/uncontrolledform'}>Uncontrolled Form</Link>
      <Link to={'/form'}>Controlled Form</Link>
    </div>
  );
};

export default Navigation;

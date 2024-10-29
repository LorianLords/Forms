import { UseFormRegisterReturn } from 'react-hook-form';

interface GenderProps {
  registerReturn: UseFormRegisterReturn;
  id: string;
  value: string;
}

const GenderRadio = ({ registerReturn, id, value }: GenderProps) => {
  return (
    <label className={'inline-flex cursor-pointer items-center'} htmlFor={id}>
      <input className={'peer hidden'} type="radio" value={id} id={id} {...registerReturn} />
      <div className="h-4 w-4 rounded-full border border-gray-300 bg-white peer-checked:border-transparent peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500"></div>
      <span className="ml-2 text-gray-700">{value}</span>
    </label>
  );
};

export default GenderRadio;

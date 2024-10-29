import { FiUpload } from 'react-icons/fi';

import { forwardRef, Ref } from 'react';

interface FileInputProps {
  value: FileList | null | undefined;
  onChange: (value: FileList | null) => void;
  onBlur: () => void;
  ref: Ref<HTMLSelectElement>;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({ value, onChange, onBlur }, ref) => {
  return (
    <>
      <input
        type="file"
        id={'picture'}
        accept={'image/jpeg, image/png'}
        onChange={(e) => {
          onChange(e.target.files);
        }}
        onBlur={onBlur}
        ref={ref}
        className="hidden"
      />
      <label
        htmlFor="picture"
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-center text-[10px] hover:border-blue-500 focus:border-blue-500 md:h-24 md:w-48 md:text-base"
      >
        <FiUpload className="mb-2 text-3xl text-gray-500" />
        {value && value.length > 0 ? (
          <span className="text-sm text-gray-700">{value[0].name}</span>
        ) : (
          <>
            <span className="text-gray-700">Click to upload photo</span>
            <span className="text-sm text-gray-500">JPEG or PNG, max 2MB</span>
          </>
        )}
      </label>
    </>
  );
});

export default FileInput;

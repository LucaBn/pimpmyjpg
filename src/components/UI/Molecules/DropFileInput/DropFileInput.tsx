import React, { ChangeEvent } from "react";

interface IDropFileInput {
  label: string;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isMultiple?: boolean;
}

const DropFileInput: React.FC<IDropFileInput> = ({
  label,
  handleImageChange,
  isMultiple = false,
}) => {
  return (
    <div className="drop-file__container bg-gradient rounded">
      <label htmlFor="file-input" className="white-space-pre-line fs-5">
        {label}
      </label>
      <input
        id="file-input"
        className="drop-file__container-input d-block opacity-0"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        multiple={isMultiple}
      />
    </div>
  );
};

export default DropFileInput;

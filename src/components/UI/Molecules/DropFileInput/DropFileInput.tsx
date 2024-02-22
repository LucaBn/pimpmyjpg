import React, { ChangeEvent, useState } from "react";

// Locales
import { useTranslation } from "react-i18next";

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
  const [fileName, setFileName] = useState<string | null>(null);

  const { t } = useTranslation("common");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files && e.target.files[0];
    const newFileName = newFile?.name;

    newFileName && setFileName(newFileName);
    handleImageChange(e);
  };

  const currentFileName = fileName && (
    <span className="text-muted">
      {`\n\n`}
      <span className="text-nowrap small">{t("input.current-file")}:</span>{" "}
      {fileName}
    </span>
  );

  return (
    <div className="drop-file__container bg-gradient rounded">
      <label htmlFor="file-input" className="white-space-pre-line fs-5">
        {label}
        {currentFileName}
      </label>
      <input
        id="file-input"
        className="drop-file__container-input d-block opacity-0 cursor-pointer"
        type="file"
        accept="image/*"
        onChange={handleChange}
        multiple={isMultiple}
      />
    </div>
  );
};

export default DropFileInput;

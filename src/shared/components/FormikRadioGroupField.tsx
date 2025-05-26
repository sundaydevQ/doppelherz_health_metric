import React from "react";
import { useField } from "formik";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface FormikRadioGroupFieldProps {
  label: string;
  name: string;
  options: RadioOption[];
  className?: string;
  horizontal?: boolean;
  required?: boolean;
  description?: string;
}

const FormikRadioGroupField: React.FC<FormikRadioGroupFieldProps> = ({
  label,
  name,
  options,
  className = "",
  horizontal = false,
  required = false,
  description,
}) => {
  // Use Formik's useField hook to connect with Formik
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const hasError = meta.touched && meta.error;

  const handleChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {description && (
        <p className="text-sm text-gray-500 mb-2">{description}</p>
      )}

      <div className="relative">
        <div className={`${horizontal ? "flex flex-wrap gap-4" : "space-y-3"}`}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`
                ${horizontal ? "" : "flex items-start"}
                ${option.disabled ? "opacity-50" : ""}
              `}
            >
              {" "}
              <div className="flex items-center">
                {" "}
                <input
                  type="radio"
                  id={`${name}-${option.value}`}
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={() => handleChange(option.value)}
                  disabled={option.disabled}
                  className={`
                    h-4 w-4 text-purple-600 transition duration-150 ease-in-out
                    ${hasError ? "border-red-300" : "border-gray-300"} 
                    ${field.value === option.value ? "border-purple-500" : ""}
                    focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 focus:outline-none
                  `}
                />
                <div className="ml-2">
                  <label
                    htmlFor={`${name}-${option.value}`}
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    {option.label}
                  </label>
                  {option.description && (
                    <p className="text-sm text-gray-500">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasError && (
          <div className="absolute right-0 top-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {hasError && (
        <p className="mt-1 text-sm text-red-600" id={`${name}-error`}>
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default FormikRadioGroupField;

import React from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasIcon?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type = "text",
  id,
  value,
  onChange,
  hasIcon = false,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${
          hasIcon ? "pr-10" : ""
        }`}
      />
      {hasIcon && (
        <CalendarDaysIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
      )}
    </div>
  </div>
);

export default InputField;

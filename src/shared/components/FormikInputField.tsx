import React from "react";
import { useField } from "formik";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export interface FormikInputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  icon?: IconType;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
}

const FormikInputField: React.FC<FormikInputFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  className = "",
  icon: Icon,
  iconPosition = "right",
  disabled = false,
  required = false,
  autoComplete,
  ...props
}) => {
  // Use Formik's useField hook to connect with Formik
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;
  const isValid = meta.touched && !meta.error;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        )}{" "}
        <input
          id={name}
          type={type}
          disabled={disabled}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`
            block w-full rounded-md shadow-sm sm:text-sm focus:outline-none
            ${
              hasError
                ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                : isValid
                ? "border-green-300 text-green-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                : field.value && String(field.value).trim() !== ""
                ? "border-blue-300 text-blue-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                : "border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            }
            ${Icon && iconPosition === "left" ? "pl-10" : "pl-3"}
            ${
              hasError || isValid || (Icon && iconPosition === "right")
                ? "pr-10"
                : "pr-3"
            }
            py-2
            ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          `}
          {...field}
          {...props}
        />
        {Icon && iconPosition === "right" && !hasError && !isValid && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        )}
        {hasError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
        {isValid && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <CheckCircleIcon
              className="h-5 w-5 text-green-500"
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

export default FormikInputField;

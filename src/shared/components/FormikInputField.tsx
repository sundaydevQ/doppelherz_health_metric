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
          className="block text-sm font-semibold text-surface-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-3.5 w-3.5 text-surface-400" aria-hidden="true" />
          </div>
        )}
        <input
          id={name}
          type={type}
          disabled={disabled}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`
            block w-full rounded-md border shadow-sm text-sm focus:outline-none transition-all duration-200 ease-in-out
            ${
              hasError
                ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 bg-red-50/50"
                : isValid
                ? "border-green-300 text-green-900 focus:border-green-500 bg-green-50/50"
                : field.value && String(field.value).trim() !== ""
                ? "border-doppelherz-primary/40 text-surface-900 focus:border-purple-400 bg-doppelherz-primary/5"
                : "border-surface-300 focus:border-purple-400 bg-white/50"
            }
            ${Icon && iconPosition === "left" ? "pl-10" : "pl-3"}
            ${
              hasError || isValid || (Icon && iconPosition === "right")
                ? "pr-10"
                : "pr-3"
            }
            py-2
            ${disabled ? "bg-surface-100 cursor-not-allowed opacity-60" : ""}
          `}
          {...field}
          {...props}
        />
        {Icon && iconPosition === "right" && !hasError && !isValid && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon className="h-3.5 w-3.5 text-surface-400" aria-hidden="true" />
          </div>
        )}
        {hasError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-3.5 w-3.5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
        {isValid && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <CheckCircleIcon
              className="h-3.5 w-3.5 text-green-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {hasError && (
        <div
          className="mt-2 text-sm text-red-600 flex items-center gap-1"
          id={`${name}-error`}
        >
          <span>⚠</span>
          {meta.error}
        </div>
      )}
    </div>
  );
};

export default FormikInputField;

import React from "react";
import { useField } from "formik";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  points?: number; // Points deducted when this option is selected
}

export interface FormikCheckboxGroupFieldProps {
  label: string;
  name: string;
  options: CheckboxOption[];
  className?: string;
  horizontal?: boolean;
  required?: boolean;
  description?: string;
  onCustomChange?: (value: string, currentValues: string[]) => string[];
  onPointDeduction?: (
    points: number,
    option: string,
    element: HTMLElement
  ) => void;
}

const FormikCheckboxGroupField: React.FC<FormikCheckboxGroupFieldProps> = ({
  label,
  name,
  options,
  className = "",
  horizontal = false,
  required = false,
  description,
  onCustomChange,
  onPointDeduction,
}) => {
  // Use Formik's useField hook to connect with Formik
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const hasError = meta.touched && meta.error;

  // Ensure the field value is an array
  const values = Array.isArray(field.value) ? field.value : [];
  const handleChange = (value: string, points?: number) => {
    const wasSelected = values.includes(value);

    if (onCustomChange) {
      // Use custom change handler if provided
      const newValues = onCustomChange(value, values);
      setValue(newValues);

      // Check if this is a new selection and has point deduction
      if (
        !wasSelected &&
        newValues.includes(value) &&
        points &&
        points > 0 &&
        onPointDeduction
      ) {
        const element = document.getElementById(`${name}-${value}`);
        if (element) {
          onPointDeduction(points, value, element);
        }
      }
    } else {
      // Default behavior
      if (wasSelected) {
        // Remove the value if it's already selected
        setValue(values.filter((item: string) => item !== value));
      } else {
        // Add the value if it's not already selected
        setValue([...values, value]);

        // Trigger point deduction if this is a new selection
        if (points && points > 0 && onPointDeduction) {
          const element = document.getElementById(`${name}-${value}`);
          if (element) {
            onPointDeduction(points, value, element);
          }
        }
      }
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-surface-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {description && (
        <p className="text-sm text-surface-500 mb-2">{description}</p>
      )}
      <div className="relative">
        <div className={`${horizontal ? "flex flex-wrap gap-2" : "space-y-2"}`}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`
                ${horizontal ? "flex-shrink-0 min-w-fit" : "w-full"}
                ${
                  option.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
                rounded-md border transition-all duration-200 ease-in-out px-3 py-2
                hover:shadow-sm hover:border-doppelherz-primary/30
                ${
                  values.includes(option.value)
                    ? "border-doppelherz-primary/40 bg-doppelherz-primary/5"
                    : "border-surface-200 bg-white/50"
                }
              `}
            >
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 flex items-center justify-center mt-0.5">
                  <input
                    type="checkbox"
                    id={`${name}-${option.value}`}
                    checked={values.includes(option.value)}
                    onChange={() => handleChange(option.value, option.points)}
                    disabled={option.disabled}
                    className="h-4 w-4 min-h-[1rem] min-w-[1rem] max-h-[1rem] max-w-[1rem] sm:h-5 sm:w-5 sm:min-h-[1.25rem] sm:min-w-[1.25rem] sm:max-h-[1.25rem] sm:max-w-[1.25rem] text-doppelherz-primary transition-all duration-200 ease-in-out border-surface-300 focus:ring-2 focus:ring-doppelherz-primary focus:ring-opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-doppelherz-primary focus-visible:ring-opacity-50 rounded cursor-pointer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor={`${name}-${option.value}`}
                    className="text-sm font-medium text-surface-700 cursor-pointer leading-snug block"
                  >
                    {option.label}
                  </label>
                  {option.description && (
                    <p className="text-xs text-surface-500 mt-1 leading-snug">
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
              className="h-3.5 w-3.5 text-red-500"
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

export default FormikCheckboxGroupField;

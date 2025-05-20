import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges Tailwind CSS classes using clsx and tailwind-merge
 * to prevent class conflicts and ensure proper specificity.
 * 
 * @param {...ClassValue[]} inputs - The CSS class values to merge
 * @returns {string} - The merged CSS class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

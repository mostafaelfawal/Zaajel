import type { JSX } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function InputField({
  id,
  label,
  type,
  icon,
  value,
  onChange,
  error,
  togglePassword,
  showPassword,
}: {
  id: string;
  label: string;
  type: string;
  icon?: JSX.Element;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  togglePassword?: () => void;
  showPassword?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="flex relative items-center">
        <span className="absolute left-3 text-gray-400">{icon}</span>
        <input
          id={id}
          type={showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          className={`font-medium w-full py-2 ${
            icon ? "px-10" : "px-3"
          } rounded-lg border border-gray-300 focus:ring-2 focus:ring-zaajel-secondary outline-none`}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
        {togglePassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 text-gray-400 hover:text-gray-500 duration-200"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
      {error && <p className="text-error text-sm">{error}</p>}
    </div>
  );
}

import { HTMLInputTypeAttribute, useEffect, useRef } from "react";

interface CustomInputProps {
  type: HTMLInputTypeAttribute;
  label: string;
  placeholder?: string;
  onChange: (num: number) => void;
  min?: number;
  max?: number;
  value?: number;
}

export const CustomInput = ({
  type,
  label,
  placeholder = "",
  onChange,
  min,
  max,
  value,
}: CustomInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!value) {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [value]);
  return (
    <div className="material-textfield">
      <input
        className="custom-input"
        placeholder={placeholder}
        ref={inputRef}
        type={type}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
      />
      <label className="custom-label">{label}</label>
    </div>
  );
};

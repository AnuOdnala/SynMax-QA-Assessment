import React, { useState } from "react";
import type { KeyboardEvent } from "react";

interface InputProps {
  onSubmit: (text: string) => void;
  placeholder?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  onSubmit,
  placeholder = "",
  className = "",
}) => {
  const [value, setValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      onSubmit(value.trim());
      setValue("");
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className={className}
    />
  );
};

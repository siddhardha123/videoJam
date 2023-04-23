import React from "react";

const Button: React.FC<
  { children: React.ReactNode | React.ReactNode[] } & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ children, disabled, ...rest }) => {
  return (
    <button
      disabled={disabled}
      className={`bg-blue-500 text-white rounded-lg px-3 py-2 h-fit ${
        disabled ? "opacity-75" : ""
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

import React from "react";

const Button = ({ onClick, text, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled} className="bg-[#FF7A28] text-white p-2 rounded-lg cursor-pointer text-sm font-semibold">
      {text}
    </button>
  );
};

export default Button;

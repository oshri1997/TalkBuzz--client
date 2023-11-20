import React, { forwardRef } from "react";

const TextInput = forwardRef(
  ({ type, placeholder, styles, label, labelStyles, register, name, error }, ref) => {
    return (
      <div className="flex flex-col w-full mt-2">
        {label && <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>}
        <div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            className={`bg-secondary rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${styles}`}
            {...register}
            aria-invalid={error ? "true" : "false"}
          />
        </div>
        {error && <span className="text-xs text-[#f64949fe] mt-2 ml-2">{error}</span>}
      </div>
    );
  }
);

export default TextInput;

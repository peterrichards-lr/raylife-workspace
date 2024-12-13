import React from 'react';
import { InputAreaWithError } from './InputArea/WithError';

export const CheckBox = React.forwardRef(
  (
    { label, name, className, error, onChange, disabled = false, value },
    ref
  ) => {
    return (
      <InputAreaWithError className={className} error={error}>
        <label for={name}>
          <input
            className="checkbox-control-input"
            type="checkbox"
            value={value}
            id={name}
            name={name}
            checked={value}
            onChange={onChange}
            ref={ref}
            disabled={disabled && !value}
          />
          {label}
        </label>
      </InputAreaWithError>
    );
  }
);

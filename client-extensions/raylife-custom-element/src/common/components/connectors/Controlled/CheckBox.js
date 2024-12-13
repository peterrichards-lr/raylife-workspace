import React from 'react';
import { Controller } from 'react-hook-form';
import { CheckBox } from '../../fragments/Forms/CheckBox';
import { Input } from '../../fragments/Forms/Input';
import { MoreInfoButton } from '../../fragments/Buttons/MoreInfo';

export function ControlledCheckBox({
  name,
  label,
  rules,
  control,
  moreInfoProps = undefined,
  inputProps = {},
  ...props
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <CheckBox
          className="checkbox-control"
          {...field}
          error={fieldState.error}
          label={label}
          renderActions={moreInfoProps && <MoreInfoButton {...moreInfoProps} />}
          required={rules?.required}
          {...inputProps}
        />
      )}
      rules={rules}
      {...props}
    />
  );
}

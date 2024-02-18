import React from 'react';

import {Controller, FieldValues, UseControllerProps} from 'react-hook-form';

import {PinInput, PinInputProps} from '../PinInput/PinInput';

export function FormPinInput<FormType extends FieldValues>({
  control,
  name,
  rules,
  ref,
  ...pinInputProps
}: PinInputProps & UseControllerProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field, fieldState}) => (
        <PinInput
          ref={ref}
          value={field.value}
          onChangeText={field.onChange}
          hasError={!!fieldState.error?.message}
          {...pinInputProps}
        />
      )}
    />
  );
}

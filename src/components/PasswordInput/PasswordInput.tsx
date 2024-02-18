import React, {useState} from 'react';

import {Icon} from '@components';

import {TextInput, TextInputProps} from '../TextInput/TextInput';

export type PasswordInputPros = Omit<TextInputProps, 'RightComponent'>;

export function PasswordInput(props: PasswordInputPros) {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  function toggleSecureTextEntry() {
    setIsSecureTextEntry(prev => !prev);
  }

  return (
    <TextInput
      secureTextEntry={isSecureTextEntry}
      {...props}
      RightComponent={
        <Icon
          color="neutral400"
          name={isSecureTextEntry ? 'eyeOn' : 'eyeOff'}
          onPress={toggleSecureTextEntry}
        />
      }
    />
  );
}

import React, {useRef} from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from 'react-native';
import {Box, BoxProps} from '../Box/Box';
import {useAppTheme} from '@hooks';

export interface PinInputProps extends RNTextInputProps {
  hasError?: boolean;
}

export function PinInputRef(
  {hasError, ...rNTextInputProps}: PinInputProps,
  ref: React.Ref<RNTextInput>,
) {
  const {colors} = useAppTheme();

  const $boxInputStyles: BoxProps = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: hasError ? 2 : 1,
    borderColor: hasError ? 'error' : 'neutral400',
    borderRadius: 's6',
    height: 52,
    width: 52,
  };

  return (
    <Box {...$boxInputStyles}>
      <RNTextInput
        ref={ref}
        placeholderTextColor={colors.neutral700}
        style={[$textInputStyles, {color: colors.neutral400}]}
        {...rNTextInputProps}
      />
    </Box>
  );
}

const $textInputStyles: TextStyle = {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
};

export const PinInput = React.forwardRef<RNTextInput, PinInputProps>(
  PinInputRef,
);

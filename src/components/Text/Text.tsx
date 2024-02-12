import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';

interface TextProps extends RNTextProps {
  preset?: TextVariants;
  bold?: boolean;
  italic?: boolean;
  semiBold?: boolean;
}

export function Text({
  children,
  preset = 'paragraphMedium',
  bold,
  italic,
  semiBold,
  style,
  ...rest
}: TextProps) {
  const fontFamily = getFontFamily(preset, bold, italic, semiBold);

  return (
    <RNText style={[$fontSizes[preset], {fontFamily}, style]} {...rest}>
      {children}
    </RNText>
  );
}

function getFontFamily(
  preset: TextVariants,
  bold?: boolean,
  italic?: boolean,
  semiBold?: boolean,
) {
  if (
    preset === 'headingLarge' ||
    preset === 'headingMedium' ||
    preset === 'headingSmall'
  ) {
    return italic ? $fontFamily.boldItalic : $fontFamily.bold;
  }

  switch (true) {
    case bold && italic:
      return $fontFamily.boldItalic;
    case bold:
      return $fontFamily.bold;
    case semiBold && italic:
      return $fontFamily.semiBoldItalic;
    case semiBold:
      return $fontFamily.semiBold;
    case italic:
      return $fontFamily.italic;
    default:
      return $fontFamily.regular;
  }
}

type TextVariants =
  | 'headingLarge'
  | 'headingMedium'
  | 'headingSmall'
  | 'paragraphLarge'
  | 'paragraphMedium'
  | 'paragraphSmall'
  | 'paragraphCaption'
  | 'paragraphCaptionSmall';

const $fontSizes: Record<TextVariants, TextStyle> = {
  headingLarge: {
    fontSize: 32,
    lineHeight: 38.4,
  },
  headingMedium: {
    fontSize: 22,
    lineHeight: 26.4,
  },
  headingSmall: {
    fontSize: 18,
    lineHeight: 23.4,
  },

  paragraphLarge: {
    fontSize: 18,
    lineHeight: 25.2,
  },
  paragraphMedium: {
    fontSize: 16,
    lineHeight: 22.4,
  },
  paragraphSmall: {
    fontSize: 14,
    lineHeight: 19.6,
  },

  paragraphCaption: {
    fontSize: 12,
    lineHeight: 16.8,
  },
  paragraphCaptionSmall: {
    fontSize: 10,
    lineHeight: 14,
  },
};

const $fontFamily = {
  black: 'Kanit-Black',
  blackItalic: 'Kanit-BlackItalic',
  bold: 'Kanit-Bold',
  boldItalic: 'Kanit-BoldItalic',
  extraBold: 'Kanit-ExtraBold',
  extraBoldItalic: 'Kanit-ExtraBoldItalic',
  extraLight: 'Kanit-ExtraLight',
  extraLightItalic: 'Kanit-ExtraLightItalic',
  italic: 'Kanit-Italic',
  light: 'Kanit-Light',
  lightItalic: 'Kanit-LightItalic',
  medium: 'Kanit-Medium',
  mediumItalic: 'Kanit-MediumItalic',
  regular: 'Kanit-Regular',
  semiBold: 'Kanit-SemiBold',
  semiBoldItalic: 'Kanit-SemiBoldItalic',
  thin: 'Kanit-Thin',
  thinItalic: 'Kanit-ThinItalic',
};

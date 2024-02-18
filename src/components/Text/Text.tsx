import {createText} from '@shopify/restyle';
import React from 'react';
import {TextStyle} from 'react-native';
import {Theme} from '../../theme/theme';

const SRText = createText<Theme>();
export type SRTextProps = React.ComponentProps<typeof SRText>;

export interface TextProps extends SRTextProps {
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
  ...sRTextProps
}: TextProps) {
  const fontFamily = getFontFamily(preset, bold, italic, semiBold);

  return (
    <SRText
      color="backgroundContrast"
      style={[$fontSizes[preset], {fontFamily}, style]}
      {...sRTextProps}>
      {children}
    </SRText>
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

export type TextVariants =
  | 'headingLarge'
  | 'headingMedium'
  | 'headingSmall'
  | 'paragraphLarge'
  | 'paragraphMedium'
  | 'paragraphSmall'
  | 'paragraphCaption'
  | 'paragraphCaptionSmall';

export const $fontSizes: Record<TextVariants, TextStyle> = {
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

export const $fontFamily = {
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

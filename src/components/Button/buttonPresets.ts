import {ThemeColors} from '../../theme/theme';
import {TouchableOpacityBoxProps} from '../Box/Box';

export type ButtonPreset = 'primary' | 'outline';

interface ButtonUI {
  container: TouchableOpacityBoxProps;
  content: ThemeColors;
}

export const buttonPresets: Record<
  ButtonPreset,
  {
    default: ButtonUI;
    disabled: ButtonUI;
  }
> = {
  primary: {
    default: {
      container: {
        backgroundColor: 'primary',
      },
      content: 'primaryContrast',
    },
    disabled: {
      container: {
        backgroundColor: 'neutral300',
      },
      content: 'neutral100',
    },
  },
  outline: {
    default: {
      container: {
        borderWidth: 2,
        borderColor: 'primary',
      },
      content: 'primary',
    },
    disabled: {
      container: {
        borderWidth: 2,
        borderColor: 'neutral400',
        backgroundColor: 'neutral100',
      },
      content: 'neutral300',
    },
  },
};

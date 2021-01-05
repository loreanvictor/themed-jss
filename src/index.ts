export { ThemedStyle, style } from './style';
export { Theme } from './theme';
export { StyleFactory } from './types';

import jss from 'jss';
import preset from 'jss-preset-default';
import { PartialDeep } from 'type-fest';

import { addDarkMode, WithDarkMode } from './dark-mode/support';
import { Theme } from './theme';

export function theme<ThemeType>(_theme: ThemeType): Theme<ThemeType>;
export function theme<ThemeType>(light: ThemeType, dark: PartialDeep<ThemeType>): Theme<WithDarkMode<ThemeType>>;
export function theme<ThemeType>(light: ThemeType, dark?: PartialDeep<ThemeType>)
  :Theme<ThemeType> | Theme<WithDarkMode<ThemeType>> {
  jss.setup(preset());

  if (dark) {
    return new Theme(addDarkMode(light, dark));
  } else {
    return new Theme(light);
  }
}

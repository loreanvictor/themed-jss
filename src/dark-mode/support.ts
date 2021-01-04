import { deepExtend } from '../util/deep-extend';


export type WithDarkMode<ThemeType> = ThemeType & {
  __dark__: ThemeType;
};

export type ExtractBaseTheme<ThemeType> = ThemeType extends WithDarkMode<infer BaseTheme> ? BaseTheme : never;


export function supportsDarkMode<ThemeType>(theme: ThemeType): theme is WithDarkMode<ExtractBaseTheme<ThemeType>> {
  return !!(theme as any).__dark__;
}


export function addDarkMode<ThemeType>(theme: ThemeType, overrides: Partial<ThemeType>): WithDarkMode<ThemeType> {
  return {
    ...theme,
    __dark__: deepExtend(theme, overrides)
  };
}

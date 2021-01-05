/* eslint-disable @typescript-eslint/no-var-requires */
/* istanbul ignore file */

const { createElement, createContext, useContext } = require('react');
import { ThemedStyle } from '../style';
import { Theme } from '../theme';

const ThemeContext = createContext(undefined as any);

export function Themed({ theme, children }: {theme: Theme<unknown>, children: any}) {
  return createElement(
    ThemeContext.Provider, { value: theme, children }
  );
}

export function useTheme(): Theme<unknown> {
  return useContext(ThemeContext);
}

export function useThemedStyle(style: ThemedStyle) {
  const theme = useTheme();

  return theme ? theme.classes(style) : undefined;
}

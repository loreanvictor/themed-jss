import { JssStyle } from 'jss';


export const LightModeMediaQuery = '(prefers-color-scheme: light)';
export const DarkModeMediaQuery = '(prefers-color-scheme: dark)';
export const DarkModeClass = '--dark';
export const DarkModeOverrideClass = '--dark-mode-override';


export function inLightMode(style: Partial<JssStyle>) {
  return {
    [`html:not(.${DarkModeClass}) &`]: {...style},
    [`@media ${LightModeMediaQuery}`]: {
      [`html:not(.${DarkModeOverrideClass}) &`]: {...style},
    }
  };
}


export function inDarkMode(style: Partial<JssStyle>) {
  return {
    [`html.${DarkModeClass} &`]: {...style},
    [`@media ${DarkModeMediaQuery}`]: {
      [`html:not(.${DarkModeOverrideClass}) &`]: {...style},
    }
  };
}

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


export function attachDarkMode(style: any, source: any) {
  const dms = `html.${DarkModeClass} &`;
  const dmmq = `@media ${DarkModeMediaQuery}`;
  const dmmqs = `html:not(.${DarkModeOverrideClass}) &`;

  if (dms in source) {
    Object.assign(source[dms], style[dms]);
  } else {
    source[dms] = style[dms];
  }

  if (dmmq in source) {
    const mq = source[dmmq];
    // istanbul ignore else
    if (dmmqs in mq) {
      Object.assign(mq[dmmqs], style[dmmq][dmmqs]);
    } else {
      mq[dmmqs] = style;
    }
  } else {
    source[dmmq] = {
      [dmmqs]: style[dmmq][dmmqs]
    };
  }
}

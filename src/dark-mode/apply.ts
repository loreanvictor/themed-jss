import { Styles } from 'jss';
import { StyleFactory } from '../types';
import { WithDarkMode } from './support';


export function applyDarkMode<ThemeType>(theme: WithDarkMode<ThemeType>, factory: StyleFactory<ThemeType>) {
  const styles = factory(theme);
  const darkStyles = factory(theme.__dark__);

  applyDiff(styles, darkStyles);

  return styles;
}


function applyDiff(source: Partial<Styles>, override: Partial<Styles>) {
  const dm: any = {};

  Object.entries(source).forEach(([key, value]) => {
    const ov = (override as any)[key];

    if (ov) {
      if (typeof value === 'string' || typeof value === 'number') {
        if (value !== ov) {
          dm[key] = ov;
        } else if (typeof value === 'string' && value.endsWith('!darkmode')) {
          source[key] = dm[key] = value.substring(0, value.length - 9);
        }
      } else {
        applyDiff(value as any, ov);
      }
    }
  });

  if (Object.keys(dm).length > 0) {
    source['body.--dark &'] = dm;
    source['@media (prefers-color-scheme: dark)'] = {
      'body:not(.--dark-mode-override) &': {...dm}
    };
  }
}

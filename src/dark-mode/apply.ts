import { Styles } from 'jss';
import { WithDarkMode } from './support';


type StylesFactory<ThemeType = any> = (theme: ThemeType) => Partial<Styles>;


export function applyDarkMode<ThemeType>(theme: WithDarkMode<ThemeType>, factory: StylesFactory<ThemeType>) {
  const styles = factory(theme);
  const darkStyles = factory(theme.__dark__);

  applyDiff(styles, darkStyles);

  return styles;
}


function applyDiff(source: Partial<Styles>, override: Partial<Styles>) {
  const dm: any = {};

  Object.entries(source).forEach(([key, value]) => {
    const ov = (override as any)[key];

    // istanbul ignore else
    if (ov) {
      if (typeof value === 'string' || typeof value === 'number') {
        if (value !== ov) {
          dm[key] = ov;
        } else if (typeof value === 'string' && value.endsWith('!darkmode')) {
          source[key] = dm[key] = value.substring(0, value.length - 9).trim();
        }
      } else {
        applyDiff(value as any, ov);
      }
    }
  });

  if (Object.keys(dm).length > 0) {
    source['html.--dark &'] = dm;
    source['@media (prefers-color-scheme: dark)'] = {
      'html:not(.--dark-mode-override) &': {...dm}
    };
  }
}

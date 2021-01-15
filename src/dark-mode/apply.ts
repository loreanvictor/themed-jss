import { Styles } from 'jss';
import { inDarkMode } from './helper';
import { WithDarkMode } from './support';


type StylesFactory<ThemeType = any> = (theme: ThemeType) => Partial<Styles>;


export function applyDarkMode<ThemeType>(theme: WithDarkMode<ThemeType>, factory: StylesFactory<ThemeType>) {
  const styles = factory(theme);
  const darkStyles = factory(theme.__dark__);

  applyDiff(styles, darkStyles);

  return styles;
}


function forceDark(value: string) {
  return typeof value === 'string' && value.endsWith('!darkmode');
}


function pure(value: any) {
  return typeof value ==='string' && forceDark(value)
    ? value.substring(0, value.length - 9).trim()
    : value
  ;
}


export function purify(source: Partial<Styles>) {
  Object.entries(source).forEach(([key, value]) => {
    if (typeof value === 'string' || typeof value === 'number') {
      source[key] = pure(value);
    } else {
      purify(value as any);
    }
  });

  return source;
}


function applyDiff(source: Partial<Styles>, override: Partial<Styles>) {
  const dm: any = {};

  Object.entries(source).forEach(([key, value]) => {
    const ov = (override as any)[key];

    // istanbul ignore else
    if (ov) {
      if (typeof value === 'string' || typeof value === 'number') {
        if (value !== ov) {
          source[key] = pure(value);
          dm[key] = pure(ov);
        } else if (forceDark(value)) {
          source[key] = dm[key] = pure(value);
        }
      } else {
        applyDiff(value as any, ov);
      }
    }
  });

  if (Object.keys(dm).length > 0) {
    Object.assign(source, inDarkMode(dm));
  }
}

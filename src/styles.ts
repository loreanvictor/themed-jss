import jss, { Styles, JssStyle } from 'jss';

import { applyDarkMode, supportsDarkMode } from './dark-mode';
import { makeId } from './util/make-id';


export type StyleClassResolver<ThemeType = any> = (themedStyle: ThemedStyle<ThemeType>) => string;
export type StylesFactory<ThemeType = any> = (theme: ThemeType, $: StyleClassResolver<ThemeType>) => Partial<Styles>;
export type StyleFactory<ThemeType = any> = (theme: ThemeType, $: StyleClassResolver<ThemeType>) => JssStyle;


export class ThemedStyles<ThemeType = any> {
  readonly id: string;

  constructor(readonly factory: StylesFactory<ThemeType>) {
    this.id = makeId();
  }

  apply(theme: ThemeType, $: StyleClassResolver<ThemeType>) {
    if (supportsDarkMode(theme)) {
      return applyDarkMode(theme, t => this.factory(t, $));
    } else {
      return this.factory(theme, $);
    }
  }

  stylesheet(theme: ThemeType, $: StyleClassResolver<ThemeType>) {
    return jss.createStyleSheet(this.apply(theme, $));
  }
}


export function styles<ThemeType=any>(factory: StylesFactory<ThemeType>) {
  return new ThemedStyles(factory);
}


export class ThemedStyle<ThemeType = any> extends ThemedStyles<ThemeType> {
  constructor(factory: StyleFactory<ThemeType>) {
    super((theme, $) => ({ scoped: factory(theme, $)} ));
  }
}


export function style<ThemeType=any>(factory: StyleFactory<ThemeType>) {
  return new ThemedStyle(factory);
}


export function global<ThemType=any>(factory: StyleFactory<ThemType>) {
  return styles((theme, $) => ({ '@global': factory(theme, $) }));
}

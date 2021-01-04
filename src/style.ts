import jss from 'jss';

import { applyDarkMode, supportsDarkMode } from './dark-mode';
import { StyleFactory } from './types';
import { makeId } from './util/make-id';


export class ThemedStyle<ThemeType = any> {
  readonly id: string;

  constructor(readonly factory: StyleFactory<ThemeType>) {
    this.id = makeId();
  }

  style(theme: ThemeType) {
    if (supportsDarkMode(theme)) {
      return applyDarkMode(theme, this.factory);
    } else {
      return this.factory(theme);
    }
  }

  stylesheet(theme: ThemeType) {
    return jss.createStyleSheet(this.style(theme));
  }
}


export function style<ThemeType=any>(factory: StyleFactory<ThemeType>) {
  return new ThemedStyle(factory);
}

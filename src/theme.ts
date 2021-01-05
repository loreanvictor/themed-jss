import { StyleSheet } from 'jss';

import { ThemedStyle } from './style';


export class Theme<ThemeType = any> {
  readonly sheets: {[id: string]: StyleSheet} = {};

  constructor(readonly theme: ThemeType) {}

  add(style: ThemedStyle<ThemeType>, attach = true) {
    if (!(style.id in this.sheets)) {
      const sheet = style.stylesheet(this.theme);
      if (attach) {
        sheet.attach();
      }

      this.sheets[style.id] = sheet;
    }

    return this;
  }

  sheet(style: ThemedStyle<ThemeType>, attach = true) {
    this.add(style, attach);

    return this.sheets[style.id];
  }

  classes(style: ThemedStyle<ThemeType>, attach = true) {
    return this.sheet(style, attach).classes;
  }
}

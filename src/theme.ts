import { StyleSheet } from 'jss';

import { ThemedStyle, ThemedStyles } from './styles';


export class Theme<ThemeType = any> {
  readonly sheets: {[id: string]: StyleSheet} = {};

  constructor(readonly theme: ThemeType) {}

  add(styles: ThemedStyles<ThemeType>, attach = true) {
    if (!(styles.id in this.sheets)) {
      const sheet = styles.stylesheet(this.theme, s => '.' + this.class(s, attach));
      if (attach) {
        sheet.attach();
      }

      this.sheets[styles.id] = sheet;
    }

    return this;
  }

  sheet(styles: ThemedStyles<ThemeType>, attach = true) {
    this.add(styles, attach);

    return this.sheets[styles.id];
  }

  classes(styles: ThemedStyles<ThemeType>, attach = true) {
    return this.sheet(styles, attach).classes;
  }

  class(style: ThemedStyle<ThemeType>, attach = true) {
    const cl = this.classes(style, attach);

    return cl[Object.keys(cl)[0]];
  }
}

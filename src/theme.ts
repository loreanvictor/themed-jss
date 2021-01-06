import { StyleSheet } from 'jss';

import { ThemedKeyframes, ThemedStyle, ThemedStyles } from './styles';


export class Theme<ThemeType = any> {
  readonly sheets: {[id: string]: StyleSheet} = {};

  constructor(readonly theme: ThemeType) {}

  _resolve(ref: ThemedStyle<ThemeType> | ThemedKeyframes<ThemeType>, attach: boolean) {
    if (ref instanceof ThemedKeyframes) {
      return this.animation(ref, attach);
    } else {
      return '.' + this.class(ref, attach);
    }
  }

  add(styles: ThemedStyles<ThemeType>, attach = true) {
    if (!(styles.id in this.sheets)) {
      const sheet = styles.stylesheet(this.theme, s => this._resolve(s, attach));
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

  animation(keyframes: ThemedKeyframes<ThemeType>, attach = true) {
    const sheet = this.sheet(keyframes, attach);

    return sheet.keyframes[Object.keys(sheet.keyframes)[0]];
  }
}

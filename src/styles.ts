import jss, { Styles } from 'jss';

import { applyDarkMode, supportsDarkMode } from './dark-mode';
import { purify } from './dark-mode/apply';
import { makeId } from './util/make-id';


export type StyleClassResolver<ThemeType = any> = {
  (ref: ThemedStyle<ThemeType> | ThemedKeyframes<ThemeType>): string;
  extend: (ref: ThemedStyle<ThemeType>) => any;
}

export function makeResolver<ThemeType = any>(
  resolve: (ref: ThemedStyle<ThemeType> | ThemedKeyframes<ThemeType>) => string,
  extend: (ref: ThemedStyle<ThemeType>) => any,
) {
  (resolve as any).extend = extend;

  return resolve as StyleClassResolver<ThemeType>;
}

// istanbul ignore next
export function noopResolver() {
  return makeResolver(() => '', () => {});
}


export type StylesFactory<ThemeType = any> = (theme: ThemeType, $: StyleClassResolver<ThemeType>) => Partial<Styles>;
export type StyleFactory<ThemeType = any> = (theme: ThemeType, $: StyleClassResolver<ThemeType>) => any;


export class ThemedStyles<ThemeType = any> {
  readonly id: string;

  constructor(readonly factory: StylesFactory<ThemeType>) {
    this.id = makeId();
  }

  apply(theme: ThemeType, $: StyleClassResolver<ThemeType>) {
    if (supportsDarkMode(theme)) {
      return applyDarkMode(theme, t => this.factory(t, $));
    } else {
      return purify(this.factory(theme, $));
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


export function global<ThemeType=any>(factory: StyleFactory<ThemeType>) {
  return styles((theme, $) => ({ '@global': factory(theme, $) }));
}


export class ThemedKeyframes<ThemeType = any> extends ThemedStyles<ThemeType> {
  constructor(factory: StyleFactory<ThemeType>) {
    super((theme, $) => ({ '@keyframes scoped': factory(theme, $) }));
  }
}


export function keyframes<ThemeType=any>(factory: StyleFactory<ThemeType>) {
  return new ThemedKeyframes(factory);
}

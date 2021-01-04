import { ComponentProcessor, ComponentProvision } from 'render-jsx/component';
import { RendererLike } from 'render-jsx';
import { StyleSheet } from 'jss';

import { ThemedStyle } from './style';


export class Theme<ThemeType> extends ComponentProcessor<Node, RendererLike<Node>> {
  private sheets: {[id: string]: StyleSheet} = {};

  constructor(readonly theme: ThemeType) {
    super();
  }

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

  process(provide: (provision: ComponentProvision) => void) {
    provide({
      theme: this
    });
  }

  priority() {
    return ComponentProcessor.PriorityMax;
  }
}


export type ThemedComponentThis<ThemeType = any> = {
  theme: Theme<ThemeType>
};

import { ComponentProcessor, ComponentProvision } from 'render-jsx/component';
import { RendererLike } from 'render-jsx';
import { Theme } from '../theme';


export class ThemePlugin<ThemeType=any> extends ComponentProcessor<Node, RendererLike<Node>> {
  // istanbul ignore next
  constructor(readonly theme: Theme<ThemeType>) {
    super();
  }

  process(
    provide: (provision: ComponentProvision) => void
  ) {
    provide({
      theme: this.theme
    });
  }

  priority() {
    return ComponentProcessor.PriorityMax;
  }
}


export function themePlug<ThemeType>(theme: Theme<ThemeType>) {
  return () => new ThemePlugin(theme);
}


export interface ThemedComponentThis<ThemeType = any> {
  theme: Theme<ThemeType>;
}

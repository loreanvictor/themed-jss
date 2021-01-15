import { RendererLike } from 'render-jsx';
import { style, when } from '../src';
import { DarkMode } from '../src/dark-mode';
import { ThemedComponentThis } from '../src/jsx';

type T = {
  card: string,
  primary: string,
  background: string
};

function E(n: number) {
  return {
    boxShadow: `0 2px ${n}px blue !darkmode`,
  };
}

const MyBtnStyle = style<T>(theme => ({
  background: theme.background,
  [when('hellow')]: {
    color: 'blue',
    ...E(2),
  },
  [when('world')]: {
    ...E(3),
  },
}));


export function MyBtn(this: ThemedComponentThis, _: {}, renderer: RendererLike<Node>) {
  const cls = this.theme.class(MyBtnStyle);

  return <button class={cls} onclick={() => DarkMode.toggle()}>Switch</button>;
}

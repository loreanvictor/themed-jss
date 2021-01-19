import { RendererLike } from 'render-jsx';
import { style } from '../src';
import { DarkMode, inDarkMode } from '../src/dark-mode';
import { ThemedComponentThis } from '../src/jsx';

type T = {
  text: string,
  primary: string,
  background: string
};


const MyBtnStyle = style<T>(theme => ({
  background: theme.text,
  color: theme.background,
  border: 'none',
  outline: 'none',
  ...inDarkMode({
    padding: 8,
  })
}));


export function MyBtn(this: ThemedComponentThis, _: {}, renderer: RendererLike<Node>) {
  const cls = this.theme.class(MyBtnStyle);

  return <button class={cls} onclick={() => DarkMode.toggle()}>Switch</button>;
}

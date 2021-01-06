import { RendererLike } from 'render-jsx';
import { style } from '../src';
import { DarkMode } from '../src/dark-mode';
import { ThemedComponentThis } from '../src/jsx';


const MyBtnStyle = style(theme => ({
  color: theme.background,
  background: theme.text,
  border: `2px solid ${theme.text}`,
  padding: 8,
  borderRadius: 3,
  cursor: 'pointer',

  '&:hover': {
    color: theme.text,
    background: 'transparent !darkmode',
  }
}));


export function MyBtn(this: ThemedComponentThis, _: {}, renderer: RendererLike<Node>) {
  const cls = this.theme.class(MyBtnStyle);

  return <button class={cls} onclick={() => DarkMode.toggle()}>Switch</button>;
}

import { RendererLike } from 'render-jsx';
import { style, ThemedComponentThis } from '../src';
import { DarkMode } from '../src/dark-mode';


const MyBtnStyle = style(theme => ({
  btn: {
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
  }
}));


export function MyBtn(this: ThemedComponentThis, _: {}, renderer: RendererLike<Node>) {
  const { btn } = this.theme.classes(MyBtnStyle);

  return <button class={btn} onclick={() => DarkMode.toggle()}>Switch</button>;
}

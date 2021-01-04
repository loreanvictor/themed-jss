import { RendererLike } from 'render-jsx';
import { CommonDOMRenderer } from 'render-jsx/dom';

import { style, theme, ThemedComponentThis } from '../src';
import { DarkMode } from '../src/dark-mode';

interface Theme {
  text: string;
  background: string;
}

const S = style<Theme>(_theme => ({
  button: {
    color: _theme.background,
    background: _theme.text,
    border: `2px solid ${_theme.text}`,
    padding: 8,
    borderRadius: 3,
    cursor: 'pointer',

    '&:hover': {
      color: _theme.text,
      background: 'transparent !darkmode',
    }
  }
}));

function Btn(this: ThemedComponentThis<Theme>, _: {}, renderer: RendererLike<Node>) {
  const { button } = this.theme.classes(S);

  return <button class={button} onclick={() => DarkMode.toggle()}>Switch</button>;
}

const T = theme({
  text: 'black',
  background: 'white',
}, {
  text: 'white',
  background: 'black'
});

T.add(style(_theme => ({
  '@global': {
    body: {
      padding: 0,
      margin: 0,
      background: _theme.background,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }
  }
})));

DarkMode.initialize();

const renderer = new CommonDOMRenderer().plug(() => T);
renderer.render(<Btn/>).on(document.body);

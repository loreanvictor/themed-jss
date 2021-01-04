import { CommonDOMRenderer } from 'render-jsx/dom';

import { style, theme } from '../src';

interface Theme {
  text: string;
  background: string;
}

const S = style<Theme>(_theme => ({
  button: {
    color: _theme.text,
    background: _theme.background,
    border: '1px solid red',

    '&:hover': {
      color: _theme.background,
      background: _theme.text,
    }
  }
}));

const T = theme({
  text: 'black',
  background: 'white',
}, {
  text: 'white',
  background: 'black'
});


const renderer = new CommonDOMRenderer();
renderer.render(<div class={T.classes(S).button}>Hellow</div>).on(document.body);

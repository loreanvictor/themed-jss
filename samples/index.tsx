import { makeRenderer } from 'callbag-jsx';

import { style, theme } from '../src';
import { DarkMode } from '../src/dark-mode';

import { MyBtn } from './my-btn';

const myTheme = theme({
  text: 'black',
  background: 'white',
}, {
  text: 'white',
  background: 'black'
});

myTheme.add(style(_theme => ({
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

const renderer = makeRenderer().plug(() => myTheme);
renderer.render(<MyBtn/>).on(document.body);

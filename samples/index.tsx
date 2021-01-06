import { makeRenderer } from 'callbag-jsx';

import { global, theme } from '../src';
import { themePlug } from '../src/jsx';
import { DarkMode } from '../src/dark-mode';

import { MyBtn } from './my-btn';

const myTheme = theme({
  text: 'black',
  background: 'white',
}, {
  text: 'white',
  background: 'black'
});

myTheme.add(global(_theme => ({
  body: {
    padding: 0,
    margin: 0,
    background: _theme.background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }
})));

DarkMode.initialize();

const renderer = makeRenderer().plug(themePlug(myTheme));
renderer.render(<MyBtn/>).on(document.body);

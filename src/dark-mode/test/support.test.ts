/* eslint-disable no-unused-expressions */
import { should } from 'chai';
import { addDarkMode, supportsDarkMode } from '../support';

should();

describe('supportsDarkMode()', () => {
  it('should return true if given object is a theme supporting dark mode.', () => {
    supportsDarkMode({ x: 2, __dark__: { y : 3 }}).should.be.true;
    supportsDarkMode({ x: 2 }).should.be.false;
  });
});

describe('addDarkMode()', () => {
  it('should add dark mode to given theme object.', () => {
    const theme = {
      primary: 'blue',
      text: 'black',
      bg: 'white',
      buttons: {
        bg: 'red',
        fg: 'white'
      }
    };

    const wd = addDarkMode(theme, {
      text: 'white',
      bg: 'black',
      buttons: {
        fg: 'black'
      }
    });

    wd.__dark__.should.eql({
      primary: 'blue',
      text: 'white',
      bg: 'black',
      buttons: {
        bg: 'red',
        fg: 'black'
      }
    });
  });
});

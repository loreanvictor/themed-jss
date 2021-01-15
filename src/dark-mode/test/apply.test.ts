import { should } from 'chai';
import { applyDarkMode } from '../apply';
import { addDarkMode } from '../support';

should();

describe('applyDarkMode()', () => {
  it('should add additional rules for dark mode.', () => {
    const T = addDarkMode({
      primary: 'red',
      bg: 'white',
      fg: 'black'
    }, {
      bg: 'black',
      fg: 'white'
    });

    const D = applyDarkMode(T, theme => ({
      a: {
        background: theme.bg,
        color: theme.fg,
        borderColor: theme.primary!,

        '&:hover': {
          background: 'transparent !darkmode',
          borderColor: theme.primary!,
        }
      }
    }));

    D.should.eql({
      a: {
        background: 'white',
        color: 'black',
        borderColor: 'red',
        '&:hover': {
          background: 'transparent',
          borderColor: 'red',
          'html.--dark &': {
            background: 'transparent',
          },
          '@media (prefers-color-scheme: dark)': {
            'html:not(.--dark-mode-override) &': {
              background: 'transparent',
            }
          },
        },
        'html.--dark &': {
          background: 'black',
          color: 'white',
        },
        '@media (prefers-color-scheme: dark)': {
          'html:not(.--dark-mode-override) &': {
            background: 'black',
            color: 'white',
          }
        }
      }
    });
  });

  it('should properly apply properties that differ in dark and light mode with !darkmode', () => {
    const T = addDarkMode({ A: 'red' }, { A: 'blue' });
    const D = applyDarkMode(T, theme => ({
      x: `${theme.A} !darkmode`
    }));

    D.should.eql({
      x: 'red',
      'html.--dark &': { x: 'blue' },
      '@media (prefers-color-scheme: dark)': {
        'html:not(.--dark-mode-override) &': {
          x: 'blue'
        }
      }
    });
  });
});

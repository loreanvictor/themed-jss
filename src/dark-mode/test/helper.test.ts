import { should } from 'chai';
import { inDarkMode, inLightMode } from '../helper';

should();

describe('inDarkMode()', () => {
  it('should return the style indicating that given style should be represented in dark mode.', () => {
    inDarkMode({
      color: 'blue',
      fontSize: '32px'
    }).should.eql({
      'html.--dark &': {
        color: 'blue',
        fontSize: '32px'
      },
      '@media (prefers-color-scheme: dark)': {
        'html:not(.--dark-mode-override) &': {
          color: 'blue',
          fontSize: '32px'
        }
      }
    });
  });
});

describe('inLightMode()', () => {
  it('should return the style indicating that given style should be represented in light mode.', () => {
    inLightMode({
      color: 'blue',
      fontSize: '32px'
    }).should.eql({
      'html:not(.--dark) &': {
        color: 'blue',
        fontSize: '32px'
      },
      '@media (prefers-color-scheme: light)': {
        'html:not(.--dark-mode-override) &': {
          color: 'blue',
          fontSize: '32px'
        }
      }
    });
  });
});
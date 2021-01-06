/* eslint-disable no-unused-expressions */
import { should } from 'chai';
import { addDarkMode } from '../dark-mode';
import { global, style, styles, ThemedStyles } from '../styles';

should();

describe('styles()', () => {
  it('should have a unique id.', () => {
    const S = styles(() => ({}));
    const T = styles(() => ({}));
    S.id.should.not.equal(T.id);
  });

  describe('.apply()', () => {
    it('should invoke given style factory using given theme.', done => {
      const T = {};
      styles(t => {
        t.should.equal(T);
        done();

        return {};
      }).apply(T, () => '');
    });

    it('should apply dark mode rules when theme supports it.', () => {
      const S = styles(t => ({
        A: {
          x: t.c
        }
      }));

      S.apply(addDarkMode({c: 1} , {c: 2}), () => '').should.eql({
        A: {
          x: 1,
          'html.--dark &': {x: 2},
          '@media (prefers-color-scheme: dark)': {
            'html:not(.--dark-mode-override) &': {
              x: 2
            }
          }
        }
      });
    });
  });

  describe('.stylesheet()', () => {
    it('should create a style sheet using given theme.', () => {
      const S = styles(t => ({a: {x: t.c + 1}}));
      const sheet = S.stylesheet({ c: 41 }, () => '');

      sheet.attached.should.be.false;
      sheet.toString().should.equal(
      // eslint-disable-next-line indent
`${(sheet.getRule('a') as any).selectorText} {
  x: 42;
}`
      );
    });
  });
});


describe('style()', () => {
  it('should create styles with a single class.', () => {
    const S = style(theme => ({
      color: 'red',
      border: theme.border
    }));

    S.should.be.instanceOf(ThemedStyles);

    const A = S.apply(addDarkMode({ border: 'black' }, { border: 'white' }), () => '');
    Object.keys(A).length.should.equal(1);
    A[Object.keys(A)[0]]!.should.eql({
      color: 'red',
      border: 'black',
      'html.--dark &': { border: 'white' },
      '@media (prefers-color-scheme: dark)': {
        'html:not(.--dark-mode-override) &': {
          border: 'white'
        }
      }
    });
  });
});


describe('global()', () => {
  it('should global styles.', () => {
    const S = global(theme => ({
      background: theme.bg
    }));

    S.should.be.instanceOf(ThemedStyles);

    const A = S.apply(addDarkMode({ bg: 'white' }, { bg: 'black' }), () => '');
    A['@global']!.should.eql({
      background: 'white',
      'html.--dark &': { background: 'black' },
      '@media (prefers-color-scheme: dark)': {
        'html:not(.--dark-mode-override) &': {
          background: 'black'
        }
      }
    });
  });
});
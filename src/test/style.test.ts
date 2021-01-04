/* eslint-disable no-unused-expressions */
import { should } from 'chai';
import { addDarkMode } from '../dark-mode';
import { style } from '../style';

should();

describe('style()', () => {
  it('should have a unique id.', () => {
    const S = style(() => ({}));
    const T = style(() => ({}));
    S.id.should.not.equal(T.id);
  });

  describe('.style()', () => {
    it('should invoke given style factory using given theme.', done => {
      const T = {};
      style(t => {
        t.should.equal(T);
        done();

        return {};
      }).style(T);
    });

    it('should apply dark mode rules when theme supports it.', () => {
      const S = style(t => ({
        A: {
          x: t.c
        }
      }));

      S.style(addDarkMode({c: 1} , {c: 2})).should.eql({
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
      const S = style(t => ({a: {x: t.c + 1}}));
      const sheet = S.stylesheet({ c: 41 });

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

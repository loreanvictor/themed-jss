import { should } from 'chai';
import { testRender } from 'test-callbag-jsx';
import { ThemedComponentThis, themePlug } from '..';

import { Theme } from '../../theme';

should();

describe('jsx', () => {
  describe('themePlug()', () => {
    it('should plug a theme into renderer, giving components access to it.', done => {
      const theme = new Theme({});
      testRender(R => {
        const renderer = R.plug(themePlug(theme));

        function Comp(this: ThemedComponentThis) {
          this.theme.should.equal(theme);
          done();

          return <></>;
        }

        <Comp/>;
      });
    });
  });
});

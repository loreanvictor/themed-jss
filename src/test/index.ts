import { should } from 'chai';
import * as jss from 'jss';

import { theme } from '..';
import { styles } from '../styles';

should();

describe('themed-jss', () => {
  require('../util/test');
  require('../dark-mode/test');
  require('../jsx/test');

  require('./styles.test');
  require('./theme.test');

  describe('theme()', () => {
    it('should create a proper theme with proper jss plugins and stuff.', () => {
      const S = styles(t => ({x: {y: t.z}}));
      const T = theme({ z: 42 });

      const Sh = T.sheet(S);
      const K = (Sh.getRule('x') as any).selectorText;

      Sh.toString().should.equal(
        // eslint-disable-next-line indent
`${K} {
  y: 42;
}`
      );

      const T2 = theme({ z: 43 }, { z: 19 });
      const Sh2 = T2.sheet(S);
      const K2 = (Sh2.getRule('x') as any).selectorText;

      Sh2.toString().should.equal(
        // eslint-disable-next-line indent
`${K2} {
  y: 43;
}
html.--dark ${K2} {
  y: 19;
}
@media (prefers-color-scheme: dark) {
  html:not(.--dark-mode-override) ${K2} {
    y: 19;
  }
}`
      );

      (jss as any)['default'] = jss.create();
    });
  });
});

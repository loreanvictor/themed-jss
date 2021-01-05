/* eslint-disable newline-before-return */
/* eslint-disable no-unused-expressions */
import { should } from 'chai';
import * as jss from 'jss';
import preset from 'jss-preset-default';
import { testRender } from 'test-callbag-jsx';

import { addDarkMode } from '../dark-mode';
import { style } from '../style';
import { Theme, ThemedComponentThis } from '../theme';

should();

describe('Theme', () => {
  it('should provide access to itself to components.', done => {
    const T = new Theme({});
    testRender(R => {
      const renderer = R.plug(() => T);

      function Comp(this: ThemedComponentThis) {
        this.theme.should.equal(T);
        done();

        return <></>;
      }

      <Comp/>;
    });
  });

  describe('.add()', () => {
    it('should add given style.', () => {
      const S = style(t => ({x: {y: t.z}}));
      const T = new Theme({ z: 42 });
      T.add(S);
      T.sheets[S.id].attached.should.be.true;
      const R = T.sheets[S.id].getRule('x');
      T.sheets[S.id].toString().should.equal(
      // eslint-disable-next-line indent
`${(R as any).selectorText} {
  y: 42;
}`
      );
    });

    it('should add styles only once.', () => {
      let r = 0;
      const S = style(t => { r++; return {x: {y: t.z}}; });
      const T = new Theme({ z: 42 });
      T.add(S);
      const sh1 = T.sheets[S.id];
      T.add(S);
      T.sheets[S.id].should.equal(sh1);
      r.should.equal(1);
    });

    it('should not attach the stylesheet when `attach = false` is passed.', () => {
      const S = style(t => ({x: {y: t.z}}));
      const T = new Theme({ z: 42 });
      T.add(S, false);
      T.sheets[S.id].attached.should.be.false;
    });
  });

  describe('.sheet()', () => {
    it('should return a sheet for given style.', () => {
      jss.default.setup(preset());
      const S = style(t => ({x: {y: t.z}}));
      const T = new Theme(addDarkMode({ z: 42 }, { z: 7 }));
      const sh = T.sheet(S);
      const K = (sh.getRule('x') as any).selectorText;
      sh.toString().should.equal(
      // eslint-disable-next-line indent
`${K} {
  y: 42;
}
html.--dark ${K} {
  y: 7;
}
@media (prefers-color-scheme: dark) {
  html:not(.--dark-mode-override) ${K} {
    y: 7;
  }
}`
      );

      (jss as any)['default'] = jss.create();
    });

    it('should return the same sheet for the same style.', () => {
      const S = style(t => ({x: {y: t.z}}));
      const T = new Theme({ z: 42 });
      T.sheet(S).should.equal(T.sheet(S));
    });

    it('should not attach the sheet when `attach = false` is passed.', () => {
      const S = style(t => ({x: {y: t.z}}));
      const T = new Theme({ z: 42 });
      T.sheet(S, false).attached.should.be.false;
    });
  });

  describe('.classes()', () => {
    it('should return class names for given style.', () => {
      const S = style(t => ({x: {y: t.z}}));
      const T = new Theme({ z: 42 });

      const { x } = T.classes(S);
      const Sh = T.sheet(S);

      x.should.equal((Sh.getRule('x') as any).id);
    });

    it('should call given style only once.', () => {
      let r = 0;
      const S = style(t => { r++; return {x: {y: t.z}}; });
      const T = new Theme({ z: 42 });
      T.classes(S);
      T.classes(S);
      r.should.equal(1);
    });

    it('should not cause the corresponding sheet to attach when `attach = false` is passed.', () => {
      const S = style(t => ({x: {y: t.z}}));
      const T = new Theme({ z: 42 });

      T.classes(S, false);
      T.sheet(S).attached.should.be.false;
    });
  });
});

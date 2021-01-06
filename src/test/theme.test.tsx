/* eslint-disable newline-before-return */
/* eslint-disable no-unused-expressions */
import { should, expect } from 'chai';
import * as jss from 'jss';
import preset from 'jss-preset-default';

import { addDarkMode } from '../dark-mode';
import { style, styles } from '../styles';
import { Theme } from '../theme';

should();

describe('Theme', () => {
  describe('.add()', () => {
    it('should add given styles.', () => {
      const S = styles(t => ({x: {y: t.z}}));
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
      const S = styles(t => { r++; return {x: {y: t.z}}; });
      const T = new Theme({ z: 42 });
      T.add(S);
      const sh1 = T.sheets[S.id];
      T.add(S);
      T.sheets[S.id].should.equal(sh1);
      r.should.equal(1);
    });

    it('should not attach the stylesheet when `attach = false` is passed.', () => {
      const S = styles(t => ({x: {y: t.z}}));
      const T = new Theme({ z: 42 });
      T.add(S, false);
      T.sheets[S.id].attached.should.be.false;
    });

    it('should allow referencing other styles.', () => {
      jss.default.setup(preset());
      const S1 = style(t => ({x: t.z}));
      const S2 = style((t, $) => ({ x: t.z, [`& ${$(S1)}`]: { y: 42 } }));
      const T = new Theme({ z: 42 });
      T.add(S2);

      const Sh1 = T.sheets[S1.id];
      const Sh2 = T.sheet(S2);

      expect(Sh1).to.not.be.undefined;
      Sh1.attached.should.be.true;

      const K1 = (Sh1 as any).rules.index[0].id;
      const K2 = (Sh2 as any).rules.index[0].id;
      Sh2.toString().should.equal(
      // eslint-disable-next-line indent
`.${K2} {
  x: 42;
}
.${K2} .${K1} {
  y: 42;
}`
      );

      (jss as any)['default'] = jss.create();
    });

    it('should not attach resolved styles if `attach = false` is passed.', () => {
      const S1 = style(t => ({x: t.z}));
      const S2 = style((t, $) => ({ x: t.z, [`& ${$(S1)}`]: { y: 42 } }));
      const T = new Theme({ z: 42 });
      T.add(S2, false);

      T.sheet(S1).attached.should.be.false;
    });
  });

  describe('.sheet()', () => {
    it('should return a sheet for given style.', () => {
      jss.default.setup(preset());
      const S = styles(t => ({x: {y: t.z}}));
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

    it('should return the same sheet for the same styles.', () => {
      const S = styles(t => ({x: {y: t.z}}));
      const T = new Theme({ z: 42 });
      T.sheet(S).should.equal(T.sheet(S));
    });

    it('should not attach the sheet when `attach = false` is passed.', () => {
      const S = styles(t => ({x: {y: t.z}}));
      const T = new Theme({ z: 42 });
      T.sheet(S, false).attached.should.be.false;
    });
  });

  describe('.classes()', () => {
    it('should return class names for given styles.', () => {
      const S = styles(t => ({x: {y: t.z}}));
      const T = new Theme({ z: 42 });

      const { x } = T.classes(S);
      const Sh = T.sheet(S);

      x.should.equal((Sh.getRule('x') as any).id);
    });

    it('should call given style only once.', () => {
      let r = 0;
      const S = styles(t => { r++; return {x: {y: t.z}}; });
      const T = new Theme({ z: 42 });
      T.classes(S);
      T.classes(S);
      r.should.equal(1);
    });

    it('should not cause the corresponding sheet to attach when `attach = false` is passed.', () => {
      const S = styles(t => ({x: {y: t.z}}));
      const T = new Theme({ z: 42 });

      T.classes(S, false);
      T.sheet(S).attached.should.be.false;
    });
  });

  describe('.class()', () => {
    it('should return a class name for given singular style.', () => {
      const S = style(t => ({ x : t.y }));
      const T = new Theme({ y: 42 });

      const Cl = T.class(S);
      const Sh = T.sheet(S);

      Cl.should.equal((Sh as any).rules.index[0].id);
    });

    it('should not cause the corresponding sheet to attach when `attach = false` is passed.', () => {
      const S = style(t => ({y: t.z}));
      const T = new Theme({ z: 42 });

      T.class(S, false);
      T.sheet(S).attached.should.be.false;
    });
  });
});

import { should } from 'chai';
import { deepExtend } from '../deep-extend';

should();

describe('deepExtend()', () => {
  it('should extend given object deeply.', () => {
    const src = {
      x: 1,
      y: 'hellow',
      z: {
        a: true,
        b: '42'
      }
    };

    const ext = deepExtend(src, {
      y: 'Hi',
      z: {
        b: '43'
      }
    });

    ext.should.eql({
      x: 1,
      y: 'Hi',
      z: {
        a: true,
        b: '43'
      }
    });
  });
});

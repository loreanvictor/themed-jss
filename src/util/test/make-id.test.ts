import { should } from 'chai';
import { makeId } from '../make-id';

should();

describe('makeId()', () => {
  it('should generate random strings.', () => {
    const a = makeId();
    const b = makeId();
    const c = makeId();
    a.should.not.equal(b);
    b.should.not.equal(c);
    a.should.not.equal(c);
  });
});

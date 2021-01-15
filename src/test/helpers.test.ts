import { should } from 'chai';

import {
  either, next, succeeding, precedingIs, parentIs, descendant, child, previousIs, ancestorIs, when, combined, not
} from '../helpers';

should();

describe('either()', () => {
  it('should return or selector rule.', () => {
    either('A', '.B', ':X', '[Y]').should.equal('A, .B, :X, [Y]');
  });
});

describe('combined()', () => {
  it('should return combined selector rule.', () => {
    combined('A', '.B', ':X', '[Y]').should.equal('A.B:X[Y]');
  });
});

describe('not()', () => {
  it('should return combined not selector rule.', () => {
    not('A', '.B', ':X', '[Y]').should.equal(':not(A.B:X[Y])');
  });
});

describe('when()', () => {
  it('should return combined selector rule with self.', () => {
    when('.A', '.B', ':X', '[Y]').should.equal('&.A.B:X[Y]');
  });
});

describe('ancestor()', () => {
  it('should return a selector for matching a particular ancestor of self.', () => {
    ancestorIs('A', '.B', ':C').should.equal('A.B:C &');
  });
});

describe('parent()', () => {
  it('should return a selector for matching a particular parent of self.', () => {
    parentIs('A', '.B', ':C').should.equal('A.B:C>&');
  });
});

describe('child()', () => {
  it('should return a selector for matching a particular child of self.', () => {
    child('A', '.B', ':C').should.equal('&>A.B:C');
  });
});

describe('descendant()', () => {
  it('should return a selector for matching a particular descendant of self.', () => {
    descendant('A', '.B', ':C').should.equal('& A.B:C');
  });
});

describe('previousIs()', () => {
  it('should return a selector for matching an element coming right before self.', () => {
    previousIs('A', '.B', ':C').should.equal('A.B:C+&');
  });
});

describe('next()', () => {
  it('should return a selector for matching an element coming right after self.', () => {
    next('A', '.B', ':C').should.equal('&+A.B:C');
  });
});

describe('precedingIs()', () => {
  it('should return a selector for matching an element coming before self.', () => {
    precedingIs('A', '.B', ':C').should.equal('A.B:C~&');
  });
});

describe('succeeding()', () => {
  it('should return a selector for matching an element coming after self.', () => {
    succeeding('A', '.B', ':C').should.equal('&~A.B:C');
  });
});

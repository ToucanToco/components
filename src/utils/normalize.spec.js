import normalize from './normalize';

describe('normalize', () => {
  test('default', () => {
    expect(normalize()).toBe('');
  });

  test('with a simple string', () => {
    expect(normalize('My simple query')).toBe('mysimplequery');
  });

  test('with a complex string', () => {
    expect(normalize('  _ :É.l,ë:p-h4/|n<7.>/< s>/|?$ ')).toBe('eleph4n7s');
  });
});

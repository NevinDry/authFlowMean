const passwordHelper = require('./../../api/helpers/password-helper');

describe('Unit Test passwordHelper', () => {

  test('It should generate a token', () => {
    expect(passwordHelper.hash("test")).toBeDefined();
  });

  test('It should compare and send true', () => {
    const pass = "test";
    const hash = passwordHelper.hash(pass);
    expect(passwordHelper.compare(pass, hash)).toBeTruthy();
  });

  test('It should compare and send false', () => {
    const pass = "test";
    const hash = passwordHelper.hash("test1");
    expect(passwordHelper.compare(pass, hash)).toBeFalsy();
  });
});
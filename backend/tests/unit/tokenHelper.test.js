const tokenHelper = require('./../../api/helpers/token-helper');
var jwt = require('jsonwebtoken');

describe('Unit Test tokenHelper', () => {

  test('It should generate a valid jwttoken', () => {
    const token = tokenHelper.createToken(1, "test");

    expect(token).toBeDefined();
    expect(jwt.decode(token).name).toBe("test");
    expect(jwt.decode(token).id).toBe(1);
  });
});
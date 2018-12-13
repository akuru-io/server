const jwt = require("jsonwebtoken");

/**
 *
 * @param {Object} payload Payload object requred to bind with the token.
 * @param {Object} options Options, such as `algorithm`, `expiresIn` etc.
 * @param {string} secretKey secretOrPublicKey
 */

function generator(
  payload = {},
  options = {},
  secretKey = process.env.KEYGEN_HASH
) {
  let token;
  try {
    token = jwt.sign(payload, secretKey, options);
  } catch (e) {
    token = null;
  }
  return token;
}

module.exports = generator;

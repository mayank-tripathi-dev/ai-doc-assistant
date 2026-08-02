const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const JWT_EXPIRY = '7d';

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      profilePic: user.profilePic,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

function generateMagicToken() {
  return crypto.randomBytes(32).toString('hex');
}

module.exports = {
  generateToken,
  verifyToken,
  generateMagicToken,
};

const { generateAccessToken, verifyToken } = require('../../utils/tokenUtils');

const refreshToken = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body missing' });
    }

    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    let decoded;
    try {
      decoded = verifyToken(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken(decoded.id);

    return res.status(200).json({
      message: 'Access token refreshed successfully',
      accessToken: newAccessToken,
    });
  } catch (err) {
    console.error('Refresh token error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { refreshToken };

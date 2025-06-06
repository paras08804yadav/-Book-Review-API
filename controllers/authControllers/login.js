const { generateAccessToken } = require('../../utils/tokenUtils');
const User = require('../../models/User');

const login = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body missing' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user._id);

    return res.status(200).json({
      message: 'Signin successful',
      accessToken,
    });
  } catch (err) {
    console.error('Signin error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };

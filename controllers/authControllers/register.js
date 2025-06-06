const User = require('../../models/User');

const register = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body missing' });
    }
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    await User.create({ name, email, password });

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register };

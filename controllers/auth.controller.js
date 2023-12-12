const bcrypt = require('bcrypt');
const User = require('../models/auth.model');
const saltRounds = 10;

exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user = new User({ email, password: hashedPassword, name });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true });

    res.status(201).send({ message: 'User created successfully', token });
  } catch (error) {
    console.log('🚀  error:', error);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid email or password');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true });

    res.status(200).send({ message: 'User logged in successfully', token });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

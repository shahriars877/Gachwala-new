const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) throw new Error('User not found');
    
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
    
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role // Include role in token
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
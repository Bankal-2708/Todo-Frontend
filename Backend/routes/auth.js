const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// sign up route

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists"
      });
    }

    // Create new user
    const user = new User({
      email,
      username,
      password: hashedPassword
    });

    // Save user
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: user
    });

  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// login route

router.post("/signin", async (req, res) => {
  try {

    // check if user exists or not

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        error: "User not found"
      })
    }

    // password matching 

    const passwordValid = await bcrypt.compare(req.body.password, user.password);

    if (!passwordValid) {
      return res.status(400).json({
        error: " Invalid password"
      })
    }

    const {password, ...others} = user._doc;
    res.status(200).json({
      message: "Login successful",
      user: others
    })

  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;
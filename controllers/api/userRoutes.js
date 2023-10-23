const router = require("express").Router();
const { User } = require("../../models");

// Handle async route functions in a reusable way
const asyncHandler = async (req, res, handler) => {
  try {
    await handler();
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

// Create a new user
router.post("/", async (req, res) => {
  asyncHandler(req, res, async () => {
    const userData = await User.create(req.body);
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    res.status(200).json(userData);
  });
});

// Login as an existing user
router.post("/login", async (req, res) => {
  asyncHandler(req, res, async () => {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res.status(400).json({ message: "Incorrect email or password, please try again" });
    } else {
      const validPassword = await userData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: "Incorrect email or password, please try again" });
      } else {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.json({ user: userData, message: "You are now logged in!" });
      }
    }
  });
});

// Logout the user
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

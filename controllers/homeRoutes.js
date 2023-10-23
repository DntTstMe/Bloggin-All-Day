const router = require("express").Router();
const { BlogPost, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

const handleErrors = (res, err) => {
  console.error(err);
  res.status(500).json(err);
};

// Function to get common data for rendering templates
const getCommonData = async (req) => {
  const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ["password"] },
    include: [
      {
        model: BlogPost,
        include: [User],
      },
      {
        model: Comment,
      },
    ],
  });

  const user = userData.get({ plain: true });
  return {
    user,
    logged_in: true,
  };
};

// Homepage Route
router.get("/", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["comment_body"],
        },
      ],
    });

    const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

    const data = {
      blogPosts,
      logged_in: req.session.logged_in,
    };

    res.render("homepage", data);
  } catch (err) {
    handleErrors(res, err);
  }
});

// Blog Post Route
router.get("/blogPost/:id", withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const blogPost = blogPostData.get({ plain: true });

    const data = {
      ...blogPost,
      logged_in: req.session.logged_in,
    };

    res.render("blogPost", data);
  } catch (err) {
    handleErrors(res, err);
    res.redirect("/login");
  }
});

// Dashboard Route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const data = await getCommonData(req);
    res.render("dashboard", data);
  } catch (err) {
    handleErrors(res, err);
  }
});

// New Post Page Route
router.get("/create", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render("create", {
        logged_in: req.session.logged_in,
        userId: req.session.user_id,
      });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    handleErrors(res, err);
  }
});

// Edit Blog Post Route
router.get("/edit/:id", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const blogPost = blogPostData.get({ plain: true });

    if (req.session.logged_in) {
      const data = {
        ...blogPost,
        logged_in: req.session.logged_in,
        userId: req.session.user_id,
      };
      res.render("edit", data);
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    handleErrors(res, err);
  }
});

// Login Route
router.all("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
  } else {
    res.render("login");
  }
});

// Export
module.exports = router;


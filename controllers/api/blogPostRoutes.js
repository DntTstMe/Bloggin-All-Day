const router = require("express").Router();
const { BlogPost } = require("../../models");
const withAuth = require("../../utils/auth");

// Handle async route functions in a reusable way
const asyncHandler = async (req, res, handler) => {
  try {
    await handler();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Route to create a new blog post
router.post("/", withAuth, asyncHandler(req, res, async () => {
  const newBlogPost = await BlogPost.create({
    ...req.body,
    user_id: req.session.user_id,
  });
  res.status(200).json(newBlogPost);
}));

// Route to edit an existing blog post
router.put("/:id", withAuth, asyncHandler(req, res, async () => {
  const [updated] = await BlogPost.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  if (!updated) {
    res.status(404).json({ message: "No blog post found with this id!" });
  } else {
    res.status(200).json(updated);
  }
}));

// Route to delete an existing blog post
router.delete("/:id", withAuth, asyncHandler(req, res, async () => {
  const deleted = await BlogPost.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!deleted) {
    res.status(404).json({ message: "No blog post found with this id!" });
  } else {
    res.status(200).json(deleted);
  }
}));

module.exports = router;

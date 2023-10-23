const router = require("express").Router();
const { Comment, User, BlogPost } = require("../../models");

// Handle async route functions in a reusable way
const asyncHandler = async (res, handler) => {
  try {
    const result = await handler();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// CREATE Comment
router.post("/", async (req, res) => {
  asyncHandler(res, async () => {
    const comment = await Comment.create({
      comment_body: req.body.comment_body,
      blogPost_id: req.body.blogPost_id,
      user_id: req.session.user_id || req.body.user_id,
    });
    return comment;
  });
});

// READ all Comments
router.get("/", async (req, res) => {
  asyncHandler(res, async () => {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: BlogPost,
          attributes: ["id"],
        },
      ],
    });
    return commentData;
  });
});

// UPDATE Comment
router.put("/:id", async (req, res) => {
  asyncHandler(res, async () => {
    const [updatedCount] = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updatedCount === 0) {
      throw { status: 400, message: "No comment found with that id!" };
    }
  });
});

// DELETE Comment
router.delete("/:id", async (req, res) => {
  asyncHandler(res, async () => {
    const deletedCount = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedCount === 0) {
      throw { status: 404, message: "No comment found with that id!" };
    }
  });
});

module.exports = router;

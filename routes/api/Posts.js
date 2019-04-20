const express = require("express");
const router = express.Router();
const postController = require("../../controllers/PostController/PostController");
const passport = require("passport");

// @ROUTE      => api/posts
// METHOD      => GET
// DESC        => GET ALL POSTS ROUTE
// ACCESS      => PUBLIC...
router.get("/", postController.getPosts);

// @ROUTE      => api/posts/:postId
// METHOD      => GET
// DESC        => GET POST BY ITS ID ROUTE
// ACCESS      => PUBLIC...
router.get("/:postId", postController.getPost);

// @ROUTE      => api/posts
// METHOD      => POST
// DESC        => CREATE POST ROUTE
// ACCESS      => PRIVATE...
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);

// @ROUTE      => api/posts/like/:postId
// METHOD      => POST
// DESC        => LIKE POST  BY ID ROUTE
// ACCESS      => PRIVATE...
router.post(
  "/like/:postId",
  passport.authenticate("jwt", { session: false }),
  postController.likePostById
);

// @ROUTE      => api/posts/unlike/:postId
// METHOD      => POST
// DESC        => LIKE POST  BY ID ROUTE
// ACCESS      => PRIVATE...
router.post(
  "/unlike/:postId",
  passport.authenticate("jwt", { session: false }),
  postController.unlikePostById
);

// @ROUTE      => api/posts/comment/:postId
// METHOD      => POST
// DESC        => POST COMMENT ROUTE
// ACCESS      => PRIVATE...
router.post(
  "/comment/:postId",
  passport.authenticate("jwt", { session: false }),
  postController.postComment
);

// @ROUTE      => api/posts/comment/:postId/:commentId
// METHOD      => DELETE
// DESC        => DELETE COMMENT BY ITS ID ROUTE
// ACCESS      => PRIVATE...
router.delete(
  "/comment/:postId/:commentId",
  passport.authenticate("jwt", { session: false }),
  postController.deleteComment
);

// @ROUTE      => api/posts/:postId
// METHOD      => DELETE
// DESC        => DELETE POST BY ITS ID ROUTE
// ACCESS      => PRIVATE...
router.delete(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  postController.deletePost
);

module.exports = router;

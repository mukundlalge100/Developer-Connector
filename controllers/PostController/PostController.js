const validatePostInput = require("../../validation/PostValidations");
const Post = require("../../models/Post");
const User = require("../../models/User");

// GET ALL POSTS METHOD ...
exports.getPosts = async (request, response, next) => {
  try {
    const posts = await Post.find()
      .populate("userId", ["userName"])
      .sort({ date: -1 });
    if (!posts) {
      return response
        .staus(404)
        .json({ errors: { noPostsFound: "No posts are found!!" } });
    }
    response.status(200).json(posts);
  } catch (error) {
    response.staus(505).json(error);
  }
};
// GET  POST BY ITS ID METHOD ...
exports.getPost = async (request, response, next) => {
  const postId = request.params.postId;
  try {
    let errors = {};
    const post = await Post.findById(postId).populate("userId", ["userName"]);
    if (!post) {
      errors.noPostsFound = "No post is found!!";
      return respones.staus(404).json(errors);
    }
    response.status(200).json(post);
  } catch (error) {
    response.status(505).json(error);
  }
};

// CREATE POST METHOD ...
exports.createPost = async (request, response, next) => {
  // VALIDTE POST INPUT BEFORE CREATING IT...
  const { errors, isValid } = validatePostInput(request.body);

  try {
    if (!isValid) {
      return response.status(404).json(errors);
    }
    const newPost = new Post({
      text: request.body.text,
      userId: request.user._id,
      name: request.body.name,
      avatar: request.body.avatar
    });

    const post = await newPost.save();
    const userId = await User.findById(request.user._id).select(
      "userName avatar"
    );

    post.userId = userId;
    response.status(200).json(post);
  } catch (error) {
    response.status(505).json(error);
  }
};
// DELETE POST BY ID METHOD ...
exports.deletePost = async (request, response, next) => {
  const postId = request.params.postId;
  try {
    let errors = {};
    const post = await Post.findById(postId);

    // CHECK IF POST IS EXISTS OR NOT ...
    if (!post) {
      errors.noPostFound = "No post found with this id";
      return response.status(404).json(errors);
    }
    // CHECK IF USER IS AUTHORIZED OR NOT ...
    if (post.userId.toString() !== request.user._id.toString()) {
      errors.unAuthorizedUser = "UnAuthorized user to delete this post";
      return reponse.status(401).json(errors);
    }
    await post.remove();
    response.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    response.status(505).json(error.message);
  }
};

// LIKE POST BY ID METHOD ...
exports.likePostById = async (request, response, next) => {
  const postId = request.params.postId;
  try {
    let errors = {};
    const post = await Post.findById(postId);

    // CHECK IF POST IS ALREADY EXISTS OR NOT ...
    if (!post) {
      errors.noPostFound = "No post found with this id";
      return response.status(404).json(errors);
    }

    // CHECK IF POST ALREADY LIKE OR NOT ...
    const alreadyLikePost =
      post.likes.filter(
        like => like.userId.toString() === request.user._id.toString()
      ).length > 0;

    if (alreadyLikePost) {
      const likedIndex = post.likes.findIndex(
        like => like.userId.toString() === request.user._id.toString()
      );
      post.likes.splice(likedIndex, 1);
      const updatedPost = await post.save();
      return response.status(200).json(updatedPost);
    }

    post.likes.unshift({ userId: request.user._id });
    const updatedPost = await post.save();
    response.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    response.status(505).json(error.message);
  }
};

// UNLIKE POST BY ID METHOD ...
exports.unlikePostById = async (request, response, next) => {
  const postId = request.params.postId;
  try {
    let errors = {};
    const post = await Post.findById(postId);

    // CHECK IF POST IS ALREADY EXISTS OR NOT ...
    if (!post) {
      errors.noPostFound = "No post found with this id";
      return response.status(404).json(errors);
    }
    // CHECK IF POST ALREADY DISLIKE OR NOT ...
    const alreadyDisLikePost =
      post.disLikes.filter(
        disLike => disLike.userId.toString() === request.user._id.toString()
      ).length > 0;

    // REMOVE USERID FROM DISLIKE ARRAY IF ALREADY DISLIKED...
    if (alreadyDisLikePost) {
      const unlikeIndex = post.disLikes.findIndex(
        disLike => disLike.userId.toString() === request.user._id
      );
      post.disLikes.splice(unlikeIndex, 1);
      const updatedPost = await post.save();
      return response.status(200).json(updatedPost);
    }

    // ADD USERID INTO DISLIKE ARRAY IF NOT DISLIKED YET ...
    post.disLikes.unshift({ userId: request.user._id });
    const updatedPost = await post.save();
    response.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    response.status(505).json(error.message);
  }
};

//  POST comment BY ID METHOD ...
exports.postComment = async (request, response, next) => {
  // VALIDTE COMMENT INPUT BEFORE CREATING IT...
  const { errors, isValid } = validatePostInput(request.body);

  try {
    if (!isValid) {
      return response.status(404).json(errors);
    }
    const post = await Post.findById(request.params.postId);
    const newComment = {
      text: request.body.text,
      userId: request.user._id,
      userName: request.body.userName,
      avatar: request.body.avatar
    };
    post.comments.unshift(newComment);
    const updatedPost = await post.save();
    response.status(200).json(updatedPost);
  } catch (error) {
    response.staus(505).json(error);
  }
};

// UNLIKE POST BY ID METHOD ...
exports.deleteComment = async (request, response, next) => {
  const postId = request.params.postId;
  const commentId = request.params.commentId;
  try {
    let errors = {};
    const post = await Post.findById(postId);

    // CHECK IF POST IS ALREADY EXISTS OR NOT ...
    if (!post) {
      errors.noPostFound = "No post found with this id";
      return response.status(404).json(errors);
    }
    // CHECK IF COMMENT IS EXIST OR NOT ...
    const commentExist =
      post.comments.filter(
        comment => comment._id.toString() === commentId.toString()
      ).length > 0;

    if (!commentExist) {
      errors.commentIsNotExist = "This comment is not exist!!";
      return response.status(400).json(errors);
    }

    const deleteIndex = post.comments.findIndex(
      comment => comment._id.toString() === commentId.toString()
    );
    post.comments.splice(deleteIndex, 1);

    const updatedPost = await post.save();
    response.status(200).json(updatedPost);
  } catch (error) {
    response.status(505).json(error.message);
  }
};

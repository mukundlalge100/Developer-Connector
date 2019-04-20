const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },

  text: {
    type: String,
    required: true
  },
  userName: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  disLikes: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      userName: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("posts", PostSchema);

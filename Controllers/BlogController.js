const PostModel = require("../Models/BlogModel");
const UserModel = require("../Models/UserModel");

const PostBlog = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(401)
        .send({ success: false, message: "All fields are required!" });
    }

    const post = new PostModel({
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename,
      user: req.id,
    });

    const savePost = await post.save();

    await UserModel.updateOne(
      {
        _id: req.id,
      },
      {
        $push: {
          blogs: savePost._id,
        },
      }
    );

    res.status(201).redirect("/");
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

const ReadPost = async (req, res) => {
  try {
    const { id } = req.params;
    const findPost = await PostModel.findById(id).populate("user");
    res.render("readmore", { findPost, title: "READ || BLOG" });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

const Delete = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(403)
        .send({ success: false, message: "Your are not allowed to delete" });
    }
    const deletePost = await PostModel.findByIdAndDelete(req.params.id);

    if (deletePost) {
      return res.status(200).redirect("/user/profile");
    } else {
      return res
        .status(500)
        .send({ success: false, message: "There is a problem" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const EditPost = async (req, res) => {
  try {
    const findPost = await PostModel.findById(req.params.id);
    res.status(200).render("editblog", { findPost, title: "EDIT || BLOG" });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const updatePost = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          image: req.file.filename,
        },
      },
      { new: true }
    );
    if (updatePost) {
      res.redirect("/user/profile");
    }
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

module.exports = { PostBlog, ReadPost, EditPost, updatePost, Delete };

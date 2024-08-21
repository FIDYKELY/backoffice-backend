// const { isValidId } = require("mysql");

function isValidId(id) {
  const regex = /^[0-9a-fA-F]+$/;
    return regex.test(id);
}

class PostController {
  constructor(repository) {
    this.repository = repository;
  }
  addPost = async (req, res) => {
    try {
      console.log('mb ato am controller louh eh');
      const userId = req.params.id;

      if (isValidId(userId)) {
        const descriptions = req.body.descriptions;
        const items = req.files;

        const new_post = await this.repository.addPost({
          id: userId,
          descriptions: descriptions,
          files: items,
        });

        return res.status(201).json({ data: new_post });
      } else {
        return res.status(401).json({ error: "Not authorized for addPost" });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
  getPost = async (req, res) => {
    try {
      const userId = req.params.id;
      if (isValidId(userId)) {
        const posts = await this.repository.getPostByOwnerId(userId);
        return res.status(200).json({ data: posts });
      } else {
        return res.status(401).json({ error: "Not authorized for getPost isValid" });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
  getAllPost = async (req, res) => {
    try {
      const posts = await this.repository.getAllPost();
      return res.status(200).json({ data: posts });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
  deletePost = async (req, res) => {
    try {
      const postId = req.params.post;

      if (isValidId(req.params.id) && isValidId(postId)) {
        const del = await this.repository.deletePost(postId);
        console.log("Je delete UN!");
        return res.status(200).json({ data: del });
      } else {
        return res.status(401).json({ error: "Not authorized for isValid deletePost" });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };

  getOnePost = async (req, res) => {
    try {
      const postId = req.params.post;
      if (isValidId(postId)) {
        const post = await this.repository.getOnePost(postId);
        console.log("Je prends UN!");
        return res.status(200).json({ data: post });
      } else {
        return res.status(401).json({ error: "Not authorized for getOnePost isValid" });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
}

module.exports = PostController;

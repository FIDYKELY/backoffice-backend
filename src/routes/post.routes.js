const router = require("express").Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'stockage/images/publication/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const PostController = require("../controllers/post.controller");
const PostRepository = require("../repositories/post.repository");
const controller = new PostController(new PostRepository());
const checkTokenAccessMiddleware = require("../middlewares/checkTokenAccess.middleware");

router.get("/posts", checkTokenAccessMiddleware, controller.getAllPost);
router.get("/posts/:post", checkTokenAccessMiddleware, controller.getOnePost);
router.post("/users/:id/posts/:post/delete", checkTokenAccessMiddleware, controller.deletePost);
router.post("/users/:id/posts", checkTokenAccessMiddleware, upload.array('files'), controller.addPost);
router.get("/users/:id/posts", checkTokenAccessMiddleware, controller.getPost);

module.exports = router;

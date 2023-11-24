const router = require("express").Router();

const ControllerUser = require("../controllers/controllerUser");
const ControllerPost = require("../controllers/controllerPost");
const ControllerCategory = require("../controllers/controllerCategory");
const authentication = require("../middleware/authentication");

router.post("/register", ControllerUser.createUser);
router.post("/login", ControllerUser.login);
router.get("/posts", ControllerPost.getPosts);
router.get("/posts/:id", ControllerPost.getPostById);
router.use(authentication);
router.post("/users", ControllerUser.createAdmin);
router.post("/posts", ControllerPost.createPost);
router.put("/posts/:id", ControllerPost.updatePostById);
router.delete("/posts/:id", ControllerPost.deletePostById);
router.post("/categories", ControllerCategory.createCategory);
router.get("/categories", ControllerCategory.getCategories);
router.get("/categories/:id", ControllerCategory.getCategoryById);
router.put("/categories/:id", ControllerCategory.updateCategoryById);
router.delete("/categories/:id", ControllerCategory.deleteCategoryById);

module.exports = router;

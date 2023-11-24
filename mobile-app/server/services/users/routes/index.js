const router = require("express").Router();

const UserController = require("../controllers");

router.get("/users", UserController.readUsers);
router.get("/users/:id", UserController.readUserById);
router.post("/users", UserController.createUser);
router.delete("/users/:id", UserController.deleteUserById);

module.exports = router;
//

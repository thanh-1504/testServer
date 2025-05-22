const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express.Router();
router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);

// router.use(authController.authorization(["ADMIN"]));
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:idUser")
  .patch(userController.updateUser)
  .delete(authController.authorization(["ADMIN"]), userController.deleteUser);
module.exports = router;

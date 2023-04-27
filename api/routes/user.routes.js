const express = require("express");
const router = express.Router();
const loginCheck = require("../app/middleware/auth.middleware");
const { isAdmin } = require("../app/middleware/rbac.middlware");
// const rbac = require("../app/middleware/rbac.middlware")
const uploader = require("../app/middleware/file-upload.middleware");

const UserController = require("../app/controllers/user.controller");
let user_obj = new UserController();

let setDestination = (req, res, next) => {
  req.dest = "user";
  next();
};

router.route("/").get(loginCheck, isAdmin, user_obj.getAllUsers);

router
  .route("/:id")
  .put(
    loginCheck,
    isAdmin,
    setDestination,
    uploader.single("image"),
    user_obj.updateUserById
  )
  .delete(user_obj.deleteUserById)
  .get(user_obj.getUserById);

module.exports = router;

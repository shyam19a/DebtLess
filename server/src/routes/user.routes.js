const router = require("express").Router();
const {
  getUsers,
  addUser,
  deleteUser
} = require("../controllers/user.controller");

router.get("/", getUsers);
router.post("/", addUser);
router.delete("/:id", deleteUser);

module.exports = router;

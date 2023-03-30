const { register, login, setAvatar, getAllUsers, firebaseLogin, checkUsername } = require("../controllers/userController.js");

const router = require("express").Router();

router.post("/register",register);
router.post("/login",login);
router.post("/firebaselogin",firebaseLogin);
router.post("/checkusername",checkUsername);
//to get this id ":id" we use req.params.is 
router.post("/setavatar/:id",setAvatar);
router.get('/allusers/:id',getAllUsers);

module.exports = router;
// router.post("/firebaseLogin", firebaseLogin);
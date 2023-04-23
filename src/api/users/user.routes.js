const{signUp, login, modifyUser, getAllUser, getUserById} = require("./user.controller");
const { isAuth, isAdmin} = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const userRouter = require("express").Router();

userRouter.get("/", getAllUser);
userRouter.get("/:id", getUserById)
userRouter.post("/", signUp);
userRouter.post("/login",login, upload.single('portada'));
userRouter.put("/:id",[isAuth], modifyUser);

module.exports = userRouter;
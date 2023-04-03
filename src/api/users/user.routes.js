const{signUp, login, modifyUser} = require("./user.controller");
const { isAuth, isAdmin} = require("../../middlewares/auth");

const userRouter = require("express").Router();

userRouter.post("/", signUp);
userRouter.post("/login",[isAuth],login);
userRouter.put("/:id",[isAuth], modifyUser);

module.exports = userRouter;
import express from "express";
import userController from "../controller/user-controller.js";

const publicRouter = new express.Router();
const prefixUsers = "/api/users";

// User Route /api/users
publicRouter.post(`${prefixUsers}`, userController.register);
publicRouter.post(`${prefixUsers}/login`, userController.login);

export { publicRouter };

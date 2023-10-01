import express from "express";

import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const privateRoute = new express.Router();
privateRoute.use(authMiddleware);

const prefixUsers = "/api/users";

// User Route /api/users
privateRoute.get(`${prefixUsers}/current`, userController.get);
privateRoute.patch(`${prefixUsers}/current`, userController.update);
privateRoute.delete(`${prefixUsers}/logout`, userController.logout);

export { privateRoute };

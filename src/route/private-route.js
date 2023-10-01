import express from "express";

import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const privateRoute = new express.Router();
privateRoute.use(authMiddleware);

const prefixUsers = "/api/users";

// User Route
privateRoute.get(`${prefixUsers}/current`, userController.get);

export { privateRoute };

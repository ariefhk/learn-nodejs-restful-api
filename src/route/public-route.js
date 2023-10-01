import express from "express";
import userController from "../controller/user-controller.js";

const publicRouter = new express.Router();

// User Route
publicRouter.post(`/api/users`, userController.register);
publicRouter.post(`/api/users/login`, userController.login);

export { publicRouter };

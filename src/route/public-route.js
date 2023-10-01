import express from "express";
import userController from "../controller/user-controller.js";

const publicRouter = new express.Router();
const prefix = "/api/users";

publicRouter.post(`${prefix}`, userController.register);

export { publicRouter };

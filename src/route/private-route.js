import express from "express";

import userController from "../controller/user-controller.js";
import contactController from "../controller/contact-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const privateRoute = new express.Router();
privateRoute.use(authMiddleware);

// User Route
privateRoute.get(`/api/users/current`, userController.get);
privateRoute.patch(`/api/users/current`, userController.update);
privateRoute.delete(`/api/users/logout`, userController.logout);

// Contact Route
privateRoute.post(`/api/contacts`, contactController.create);
privateRoute.get(`/api/contacts/:contactId`, contactController.get);
privateRoute.put(`/api/contacts/:contactId`, contactController.update);
privateRoute.delete(`/api/contacts/:contactId`, contactController.remove);

export { privateRoute };

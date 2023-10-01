import express from "express";
import { publicRouter } from "../route/public-route.js";
import { privateRoute } from "../route/private-route.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

export const web = express();

web.use(express.urlencoded({ extended: true }));
web.use(express.json());
web.use(publicRouter);
web.use(privateRoute);
web.use(errorMiddleware);

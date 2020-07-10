import { Router } from "express";

import multer from "multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import RecipientController from "./app/controllers/RecipientController";
import authMiddleware from "./app/middlewares/auth";
import DeliveryController from "./app/controllers/DeliveryController";
import FileController from "./app/controllers/FileController"

import multerConfig from "./config/multer";


const routes = Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);
routes.put("/users", UserController.update);
routes.post("/recipients", RecipientController.store);
routes.put("/recipients/:id", RecipientController.update);

routes.post("/deliveries", DeliveryController.store);
routes.get("/deliveries", DeliveryController.index);
routes.put("/deliveries/:id", DeliveryController.update);
routes.delete("/deliveries/:id", DeliveryController.delete);

routes.post("/files", upload.single("file"), FileController.store);

export default routes;

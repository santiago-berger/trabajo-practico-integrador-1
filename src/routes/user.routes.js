import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import {
  createUserValidation,
  updateUserValidation,
  userIdValidation,
} from "../middlewares/validations/user.validation.js";
import { validate } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const userRouter = Router();

userRouter.get("/users", authMiddleware, adminMiddleware, getUsers);
userRouter.get("/users/:id", authMiddleware, adminMiddleware, userIdValidation, validate, getUserById);
userRouter.post("/users", authMiddleware, adminMiddleware, createUserValidation, validate, createUser);
userRouter.put("/users/:id", authMiddleware, adminMiddleware, updateUserValidation, validate, updateUser);
userRouter.delete("/users/:id", authMiddleware, adminMiddleware, userIdValidation, validate, deleteUser);
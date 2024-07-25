import express from "express";
import {
  getUsers,
  login,
  editUser,
  getUser,
} from "../controller/user.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/user-info", authMiddleware, getUser);
router.post("/login", login);
router.put("/update-user-data", authMiddleware, editUser);
router.get("/fetch-user-data", getUsers);

export default router;

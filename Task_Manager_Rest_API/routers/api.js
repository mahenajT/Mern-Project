import express from 'express';
const router  = express.Router();

import * as UserController from "../app/controllers/UserController.js"
import * as TaskController from "../app/controllers/TaskController.js"

// User Controller
router.post("/Registration", UserController.Registration)
router.post("/Login", UserController.Login)
router.get("/ProfileDetails", UserController.ProfileDetails)
router.post("/ProfileUpdate", UserController.ProfileUpdate)
router.post("/EmailVerify", UserController.EmailVerify)
router.post("/CodeVerify", UserController.CodeVerify)
router.post("/ResetPassword", UserController.ResetPassword)

// Task Controller

router.post("/CreateTask", TaskController.CreateTask)
router.get("/", TaskController.UpdateTaskStatus)
router.get("/TaskListByStatus", TaskController.TaskListByStatus)
router.get("/DeleteTask", TaskController.DeleteTask)
router.get("/CountTask", TaskController.CountTask)

export default router;
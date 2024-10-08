import express from 'express';
const router  = express.Router();

import * as UserController from "../app/controllers/UserController.js"
import * as TaskController from "../app/controllers/TaskController.js"
import authentication_middleware from "../app/middlewares/Authentication_middleware.js";
import Authentication_middleware from "../app/middlewares/Authentication_middleware.js";

// User Controller
router.post("/Registration", UserController.Registration)
router.post("/Login", UserController.Login)
router.get("/ProfileDetails", authentication_middleware,UserController.ProfileDetails)
router.post("/ProfileUpdate",authentication_middleware, UserController.ProfileUpdate)
router.post("/EmailVerify/:email", UserController.EmailVerify)
router.post("/CodeVerify", UserController.CodeVerify)
router.post("/ResetPassword", UserController.ResetPassword)

// Task Controller

router.post("/CreateTask",Authentication_middleware, TaskController.CreateTask)
router.get("/UpdateTaskStatus/:id/:status",Authentication_middleware ,TaskController.UpdateTaskStatus)
router.get("/TaskListByStatus/:status",Authentication_middleware ,TaskController.TaskListByStatus)
router.get("/DeleteTask/:id", Authentication_middleware,TaskController.DeleteTask)
router.get("/CountTask", Authentication_middleware,TaskController.CountTask)

export default router;
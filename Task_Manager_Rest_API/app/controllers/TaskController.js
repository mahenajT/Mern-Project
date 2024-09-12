import TasksModel from "../models/TasksModels.js";
import mongoose from "mongoose";

export const CreateTask = async (req, res) => {
  try {
    let user_id = req.headers["user_id"];
    let requestBody = req.body;
    requestBody.user_id = user_id;

    await TasksModel.create(requestBody);
    return res.json({
      status: "success",
      Message: "Task Created Successfully",
    });
  } catch (e) {
    return res.json({ Status: "Error", message: e.toString() });
  }
};
export const UpdateTaskStatus = async (req, res) => {
  try {
    let id = req.params.id;
    let status = req.params.status;
    let user_id = req.headers["user_id"];

    await TasksModel.updateOne(
      { _id: id, user_id: user_id },
      {
        status: status,
      }
    );
    return res.json({
      status: "success",
      message: "TaskStatus Updated Successfully",
    });
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};
export const DeleteTask = async (req, res) => {
  try {
    let id = req.params.id;
    let user_id = req.headers["user_id"];

    await TasksModel.deleteOne({ _id: id, user_id: user_id });
    return res.json({
      status: "success",
      message: "Task Deleted Successfully",
    });
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};
export const TaskListByStatus = async (req, res) => {
  try {
    let user_id = req.headers["user_id"];
    let status = req.params.status;
    let data = await TasksModel.find({ user_id: user_id, status: status });
    return res.json({
      status: "success",
      message: "TaskList Sorted by Status",
      data: data,
    });
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};
export const CountTask = async (req, res) => {
  try {
    let ObjectId = mongoose.Types.ObjectId;
    let user_id = new ObjectId(req.headers["user_id"]);
    let data = await TasksModel.aggregate([
      { $match: { user_id: user_id } },
      { $group: { _id: "$status", sum: { $count: {} } } },
    ]);

    return res.json({
      status: "success",
      message: "Count Success",
      data: data,
    });
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};

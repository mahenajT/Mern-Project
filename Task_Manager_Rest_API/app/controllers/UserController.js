import User from "../models/UsersModels.js";
import { TokenEncode } from "../utilities/Token_Utility.js";

export const Registration = async (req, res) => {
  try {
    let reqBody = req.body;
    await User.create(reqBody);
    return res.json({
      status: "success",
      Message: " User registration successful ",
    });
  } catch (err) {
    return res.json({
      status: "Fail",
      Message: " User registration Failed ",
      Error: err.toString(),
    });
  }
};
export const Login = async (req, res) => {
  let reqBody = req.body;
  let data = await User.findOne(reqBody);

  if (data == null) {
    return res.json({
      status: "fail",
      Message: "User not found",
    });
  } else {
    let token = TokenEncode(data["email"], data["_id"]);
    return res.json({
      status: "success",
      Message: "User Registered Successfully!",
      data: { token: token },
    });
  }
};
export const ProfileDetails = async (req,res) => {return res.json({status:"success"});}
export const ProfileUpdate = async (req,res) => {return res.json({status:"success"});}
export const EmailVerify = async (req,res) => {return res.json({status:"success"});}
export const CodeVerify = async (req,res) => {return res.json({status:"success"});}
export const ResetPassword = async (req,res) => {return res.json({status:"success"});}
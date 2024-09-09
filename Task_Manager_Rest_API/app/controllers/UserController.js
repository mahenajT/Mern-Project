import UsersModels from "../models/UsersModels.js";

export const Registration = async (req, res) => {
  try {
    let reqBody = req.body;
    await UsersModels.create(reqBody);
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
export const Login = async (req,res) => {return res.json({status:"success"});}
export const ProfileDetails = async (req,res) => {return res.json({status:"success"});}
export const ProfileUpdate = async (req,res) => {return res.json({status:"success"});}
export const EmailVerify = async (req,res) => {return res.json({status:"success"});}
export const CodeVerify = async (req,res) => {return res.json({status:"success"});}
export const ResetPassword = async (req,res) => {return res.json({status:"success"});}
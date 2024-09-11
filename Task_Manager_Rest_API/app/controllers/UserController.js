import User from "../models/UsersModels.js";
import { TokenEncode } from "../utilities/Token_Utility.js";
import SendEmail from "../utilities/Email_Utility.js";

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
export const ProfileDetails = async (req, res) => {
  try {
    let user_id = req.headers["user_id"];
    let data = await User.findOne({ _id: user_id });
    return res.json({
      status: "success",
      message: "Profile Details Successfully",
      data: data,
    });
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};
export const ProfileUpdate = async (req, res) => {
  try {
    let requestBody = req.body;
    let user_id = req.headers["user_id"];
    await User.updateMany({ _id: user_id }, requestBody);
    return res.json({
      status: "success",
      message: "Profile Updated Successfully",
    });
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};
export const EmailVerify = async (req, res) => {
  try {
    let email = req.params.email;
    let data = await User.findOne({ email: email });
    if (data == null) {
      return res.json({ status: "fail", Message: "User not found" });
    } else {
      // Send OTP TO EMAIL
      let code = Math.floor(100000 + Math.random() * 900000);
      let EmailTo = data["email"];
      let EmailText = "Your Code is " + code;
      let EmailSubject = "Task Manager";
      await SendEmail(EmailTo, EmailText, EmailSubject);
      // Update OTP in user
      await User.updateOne({ email: email }, { otp: code });
      return res.json({
        status: "success",
        message: "OTP code sent Successfully",
      });
    }
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};

export const CodeVerify = async (req, res) => {
  try {
    let reqBody = req.body;
    let data = await User.findOne({
      email: reqBody["email"],
      otp: reqBody["otp"],
    });
    if (data == null) {
      return res.json({ status: "fail", Message: "Wrong Verification code" });
    } else {
      return res.json({
        status: "success",
        Message: "Verification Successful",
      });
    }
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};
export const ResetPassword = async (req, res) => {
  try {
    let reqBody = req.body;
    let data = await User.findOne({
      email: reqBody["email"],
      otp: reqBody["otp"],
    });
    if (data == null) {
      return res.json({ status: "fail", Message: "Wrong Verification code" });
    } else {
      await User.updateOne(
        { email: reqBody["email"] },
        {
          otp: 0,
          password: reqBody["password"],
        }
      );
      return res.json({
        status: "success",
        message: " Password Updated Successful ly",
      });
    }
  } catch (e) {
    return res.json({ status: "fail", Message: e.toString() });
  }
};

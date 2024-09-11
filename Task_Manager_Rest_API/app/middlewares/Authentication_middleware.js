import { TokenDecode } from "../utilities/Token_Utility.js";

export default (req, res, next) => {
  let token = req.headers["token"];
  let decodedToken = TokenDecode(token);
  if (decodedToken == null) {
    res.status(401).json({ status: "fail", Message: "Unauthorized" });
  } else {
    let email = decodedToken.email;
    let user_id = decodedToken.user_id;
    req.headers.email = email;
    req.headers.user_id = user_id;
    next();
  }
};

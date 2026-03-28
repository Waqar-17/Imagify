import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      // --- THE FIX IS HERE ---
      if (!req.body) {
        req.body = {}; // Create the object if it doesn't exist
      }
      req.body.userId = tokenDecode.id;
      // -----------------------
      
      next();
    } else {
      return res.json({ success: false, message: "Not Authorized. Login Again" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default userAuth;
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    //! Get the token from the header
    const headerObj = req.headers;

    if (!headerObj.authorization) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = headerObj.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing from authorization header" });
    }

    // Verify token
    jwt.verify(token, "anyKey", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token, please login again" });
      } else {
        // Save the user into req.user
        req.user = decoded.id;
        next();
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = isAuthenticated;

const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, "shlok", (err, decoded) => {
      if (decoded) {
        req.body.userID = decoded.userID;
        req.body.author = decoded.author;
        next();
      } else {
        res.send({ msg: "you are not authorized" });
      }
    });
  } else {
    res.send({ msg: "you are not authorized" });
  }
};

module.exports = auth;

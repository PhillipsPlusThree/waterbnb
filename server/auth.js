import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPasswordMiddleware = (req, res, next) => {
  if (
    req.body.password &&
    req.originalUrl !== "/api/login" 
  ) {
    bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ err: "Error hashing password" });
      }
      req.body.password = hashedPassword;
      next();
    });
  } else {
    next();
  }
};
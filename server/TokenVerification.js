import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    !token && res.status(401).json("You're not authenticated");
    jwt.verify(token, process.env.jwtKey, (err, data) => {
      if (err) {
        return res.status(403).json("Invalid Token");
      } else {
        req.user = data;
        next();
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.params.id === req.user.id || req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json("You can't carry out this function");
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const verifyTokenAndAdmin = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json("You can't carry out this function");
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

import User from "../models/User.js"
import jwt from "jsonwebtoken"

const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    // console.log("token", token)

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      })
    }

    const decoded = await jwt.verify(
      token,
      process.env.SECRET_KEY
    )
    // console.log("decoded", decoded)
    req.user = await User.findById(decoded._id)
    // console.log(req.user)

    next()
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export default requireAuth

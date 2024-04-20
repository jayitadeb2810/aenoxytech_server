import express from "express"
import {
  signUp,
  createProfile,
  myProfile,
  emailResend,
} from "../controllers/User.js"
import requireAuth from "../middlewares/requireAuth.js"

const router = express.Router()

router.route("/signup").post(signUp)

router
  .route("/profile/create")
  .post(requireAuth, createProfile)

router
  .route("/profile")
  .get(requireAuth, myProfile)

router
  .route("/emailresend")
  .get(requireAuth, emailResend)

export default router

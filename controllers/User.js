import { sendEmail } from "../middlewares/sendEmail.js"
import User from "../models/User.js"
import cloudinary from "cloudinary"

export const signUp = (req, res) => {
  const {
    name,
    username,
    email,
    password,
    agreed,
  } = req.body

  // Simple validation
  if (
    !name ||
    !username ||
    !email ||
    !password ||
    !agreed
  ) {
    return res.status(400).json({
      message: "Emptyfield",
    })
  }

  // Check for existing user
  User.findOne({
    $or: [{ username }, { email }],
  }).then((existingUser) => {
    if (existingUser) {
      const errors = {}
      if (existingUser.username === username) {
        errors.type = "Username"
        return res
          .status(400)
          .json({ message: errors.type })
      }
      if (existingUser.email === email) {
        errors.type = "Email"
        return res
          .status(400)
          .json({ message: errors.type })
      }
    } else {
      const newUser = new User({
        name,
        username,
        email,
        password,
      })

      // Save the user
      newUser
        .save()
        .then((user) => {
          sendEmail({
            email: user.email,
            subject: "Thank you for signing up",
            message:
              "Welcome to our platform! We appreciate you signing up.",
          })
          const token = user.generateToken()
          res.status(200).json({
            message:
              "User registered successfully",
            user,
            token,
          })
        })
        .catch((err) => console.log(err))
    }
  })
  // User.findOne({ username: username }).then(
  //   (user) => {
  //     if (user) {
  //       return res.status(400).json({
  //         message:
  //           "Username already has been taken",
  //       })
  //     } else {
  //       const newUser = new User({
  //         name,
  //         username,
  //         email,
  //         password,
  //       })

  //       // Save the user
  //       newUser
  //         .save()
  //         .then((user) => {
  //           sendEmail({
  //             email: user.email,
  //             subject: "Thank you for signing up",
  //             message:
  //               "Welcome to our platform! We appreciate you signing up.",
  //           })
  //           const token = user.generateToken()
  //           res.status(200).json({
  //             message:
  //               "User registered successfully",
  //             user,
  //             token,
  //           })
  //         })
  //         .catch((err) => console.log(err))
  //     }
  //   }
  // )
}

export const createProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    const myCloud =
      await cloudinary.v2.uploader.upload(
        req.body.image,
        {
          folder: "profile_image",
        }
      )
    user.image.public_id = myCloud.public_id
    user.image.url = myCloud.secure_url
    user.location = req.body.location
    user.role = req.body.role

    await user.save()

    res.status(201).json({
      success: true,
      message: "Profile created",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
export const emailResend = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (user) {
      sendEmail({
        email: user.email,
        subject: "Thank you for signing up",
        message:
          "Welcome to our platform! We appreciate your signing up.",
      })
      res.status(200).json({
        success: true,
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

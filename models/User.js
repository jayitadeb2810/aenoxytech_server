import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// import crypto from "crypto"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },

  username: {
    type: String,
    required: [true, "Please enter a username"],
  },

  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [
      6,
      "Password must be at least 6 characters",
    ],
    // select: false,
  },
  image: {
    public_id: String,
    url: String,
  },
  location: {
    type: String,
  },
  role: [
    {
      type: String,
    },
  ],
})

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      10
    )
  }

  next()
})

userSchema.methods.matchPassword =
  async function (password) {
    return await bcrypt.compare(
      password,
      this.password
    )
  }

userSchema.methods.generateToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.SECRET_KEY
  )
}

const User = mongoose.model("User", userSchema)

export default User

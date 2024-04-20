import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import userRoutes from "./routes/User.js"
const app = express()

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://aenoxytech-application.onrender.com/"
    // "http://localhost:3000"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  )
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  )
  res.setHeader(
    "Access-Control-Allow-Credentials",
    true
  )
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

app.use("/api/J3", userRoutes)

export default app

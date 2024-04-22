import dotenv from "dotenv"
import cloudinary from "cloudinary"
import app from "./app.js"
// import { connectDatabase } from "./config/database.js"

dotenv.config()

// const options = {
//   origin: "http://localhost:3000",
//   methods: "GET, PUT, POST, DELETE",
// }

// app.use(cors(options))

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.get("/", (req, res) =>
  res.send("Hello Welcome to Aenoxy.com")
)

app.listen(process.env.PORT, () => {
  console.log(
    `Server running at http://localhost:${process.env.PORT}`
  )
})

// connectDatabase()

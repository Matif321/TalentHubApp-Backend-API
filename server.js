
import express from "express"
import dotenv from "dotenv"
import dbconnetion from "./database/db.js";
import userRoutes from "./routes/authRoutes.js"
dotenv.config();
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())
app.use("/api/v1/users", userRoutes)




app.listen(port, () => {
    dbconnetion();
    console.log(`Example app listening on port ${port}`)
})

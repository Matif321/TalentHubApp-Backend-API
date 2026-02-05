
import express from "express"
import dotenv from "dotenv"
import dbconnetion from "./database/db.js";
dotenv.config();
const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    dbconnetion();
    console.log(`Example app listening on port ${port}`)
})

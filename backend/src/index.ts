import express from 'express'
import cors from "cors"
import router from './routes/routes'
import connectDB from './db'

const app = express()

const PORT = process.env.PORT
app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

app.get("/" , (req, res) =>{
    res.send("He there");
})
app.use("/api", router);


app.listen(PORT , () => {
    connectDB()
    console.log("Server is started and running")
})
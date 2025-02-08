import express from 'express'
import cors from "cors"
// import authRoutes from './routes/auth'
import router from './routes/routes'
import connectDB from './db'


const app = express()



const PORT = process.env.PORT
app.use(express.json())
app.use(cors());

app.get("/" , (req, res) =>{
    res.send("He there");
})


// app.use("/auth" , authRoutes)
app.use("/api", router);
app.listen(PORT , () => {
    connectDB()
    console.log("Server is started and running")
})
import express from "express";
import userRouter from "./routers/UserRouter.js";
import { connectDB } from "./config/mongodbConfig.js";
import cors from 'cors'
const app = express();
const PORT = process.env.PORT || 8080;


//middlewares
app.use(express.json())
app.use(cors())

//Api-endPoints
app.use("/api/v1/users", userRouter);
connectDB();
app.get("/", (req, res) => {
  res.json({
    message: "hello",
  });
});

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log("server running at port", `${PORT}`);
});

import express from "express";
import userRouter from "./routers/UserRouter.js";
import TransactionRouter from "./routers/transactionRouter.js";
import { connectDB } from "./config/mongodbConfig.js";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandlerMiddleware.js";
const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(cors());

//Api-endPoints
app.use("/api/v1/users", userRouter);
app.use("/api/v1/transactions", TransactionRouter);
connectDB();
app.get("/", (req, res) => {
  res.json({
    message: "hello",
  });
});
// page not found
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.statusCode = 404;
  next(error);
});

//global error handler
app.use(errorHandler);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log("server running at port", `${PORT}`);
});

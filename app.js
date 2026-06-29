import authRouter from "#routes/auth";
import professorsRouter from "#routes/professors";
import departmentsRouter from "#routes/departments";
import morgan from "morgan";
import express from "express";
import cors from "cors";

const app = express();
export default app;

app.use(cors({ origin: /localhost/ }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/departments", departmentsRouter);
app.use("/professors", professorsRouter);

app.route("/").get((req, res) => {
  res.send("Hello Lincoln!");
});
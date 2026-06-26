import morgan from "morgan";
import express from "express";
import cors from "cors";

const app = express();
export default app;

// middleware
app.use(cors({ origin: /localhost/ }));
app.use(express.json());
app.use(morgan("dev"));

app.route("/").get((req, res) => {
  res.send("Hello Lincoln!");
});
import "reflect-metadata"
import * as express from "express";
import route from "./routes/index.route";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("App running...!")
});

app.use("/api/v1", route);

app.use(function (req, res, next) {
  res.status(404).send("Route not found!");
});

export default app;

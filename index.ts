import express from "express";
import cors from "cors";
import logger from "./utils/logger";
import UserRoute from "./routes/user.route";
import PostRoute from "./routes/post.route";

const app = express();

app.use(
  cors({
    credentials: true,
    allowedHeaders: ["*"],
    methods: ["*"],
    origin: "localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/posts", PostRoute);

(async () => {
  app.listen(5000, () => logger.info("Server is running on port 5000!"));
})();

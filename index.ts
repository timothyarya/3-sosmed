import express from "express";
import cors from "cors";
import logger from "./utils/logger";
import UserRoute from "./routes/user.route";
import PostRoute from "./routes/post.route";

// Create an express application
const app = express();

// Enable CORS for the client
app.use(
  cors({
    // Allow credentials (cookies, authorization headers, etc.)
    credentials: true,
    // Allow all headers
    allowedHeaders: ["*"],
    // Allow all methods
    methods: ["*"],
    // Only allow requests from the client
    origin: "localhost:3000",
  })
);

// Parse JSON bodies
app.use(express.json());

// Parse URL encoded bodies
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/posts", PostRoute);

// Start the server
(async () => {
  app.listen(5000, () => logger.info("Server is running on port 5000!"));
})();

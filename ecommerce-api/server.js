import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.conf.js";
import routes from "./src/routes/index.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import logger from "./src/middlewares/logger.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(logger);
app.use(errorHandler);

connectDB();

app.get("/", (req, res) => {
  res.send("API Ecommerce con MongoDB");
});


app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
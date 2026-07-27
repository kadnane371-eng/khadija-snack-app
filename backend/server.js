const express = require("express");
const cors = require("cors");
const { apiReference } = require("@scalar/express-api-reference");
const openApiSpec = require("./docs/openapi");
require("dotenv").config();

const sequelize = require("./config/database");
const platRoutes = require("./routes/platRoutes");
require("./models");
const fallbackPlats = require("./data/fallbackPlats");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.use(cors());
app.use(express.json());
app.use("/docs", apiReference({ content: openApiSpec }));
app.use("/api/plats", platRoutes);
app.get("/", (req, res) => res.send("Backend is running 🚀"));

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connection successful");
  } catch (error) {
    console.warn("Database unavailable, using fallback data:", error.message);
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
};

startServer();

app.get("/api/plats", (req, res) => {
  res.status(200).json(fallbackPlats);
});
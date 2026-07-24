const express = require("express");
const cors = require("cors");
const { apiReference } = require("@scalar/express-api-reference");
const openApiSpec = require("./docs/openapi");
require("dotenv").config();

const sequelize = require("./config/database");
const platRoutes = require("./routes/platRoutes");
require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/docs", apiReference({ spec: { content: openApiSpec } }));
app.use("/api/plats", platRoutes);
app.get("/", (req, res) => res.send("Backend is running 🚀"));

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
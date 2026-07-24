const express = require("express");
const cors = require("cors");
const { apiReference } = require('@scalar/express-api-reference');
const openApiSpec = require('./docs/openapi');
require("dotenv").config();

const sequelize = require("./config/database");

const platRoutes = require("./routes/platRoutes");

require("./models");

const app = express();

app.use(cors());
app.use(express.json());
app.use('/docs',apiReference({
    spec: {
    content: openApiSpec,
},
})
);

app.use("/api/plats",platRoutes);

sequelize
.sync()
.then(() => {
    console.log("Database connected");

    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
})
.catch((err) => {
    console.log(err);
});
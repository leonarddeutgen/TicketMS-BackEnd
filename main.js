const { sequelize, ticket } = require("./models");
const migrationhelper = require("./migrationhelper");
const express = require("express");
//const cors = require("cors");
const app = express();
const port = 3000; // "Radiofrekvens"

app.use(express.json());

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  })
);

app.listen(port, async () => {
  await migrationhelper.migrate();
  await sequelize.authenticate();
  console.log(`App listening on port ${port}`);
});

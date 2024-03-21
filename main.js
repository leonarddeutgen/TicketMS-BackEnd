const { sequelize, ticket } = require("./models");
const migrationhelper = require("./migrationhelper");
const ticketController = require("./controllers/ticketController.js");
const express = require("express");
//const cors = require("cors");
const app = express();
const port = 3000; // "Radiofrekvens"

app.use(express.json());

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Get all tickets
app.get("/api/tickets", ticketController.getAllTickets);

//Get one tickets
app.get("/api/tickets/:id", ticketController.getOneTicket);

//Post ticket
app.post("/api/newticket", ticketController.newTicket);

//Edit ticket
app.put("/api/editticket/:id", ticketController.editTicket);

//Delete ticket
app.delete("/api/tickets/:id", ticketController.deleteTicket);

app.listen(port, async () => {
  await migrationhelper.migrate();
  await sequelize.authenticate();
  console.log(`App listening on port ${port}`);
});

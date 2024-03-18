const { Ticket } = require("../models");
const { Op } = require("sequelize");

//Get all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();

    res.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).send("Server Error");
  }
};

//Get one ticket
const getOneTicket = async (req, res) => {
  const oneTicket = await Ticket.findOne({
    where: { id: req.params.id },
  });
  if (oneTicket === undefined) {
    res.status(404).send("Ticket not found");
  }
  res.json(oneTicket);
};

//Get all tickets
const newTicket = async (req, res) => {
  const { name, title, description, orderNo, itemNo, puoNo, color } = req.body;

  try {
    await Ticket.create({
      name,
      title,
      description,
      orderNo,
      itemNo,
      puoNo,
      color,
    });

    res.status(201).json({ name });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//Dlete selected ticket
const deleteTicket = async (req, res) => {
  try {
    const ticketToDelete = await Ticket.findOne({
      where: { id: req.params.id },
    });

    if (!ticketToDelete) {
      return res.status(404).json({ message: "Ticket finns ej" });
    }
    await ticketToDelete.destroy();
    return res.status(200).json({ message: "Ticket har tagits bort" });
  } catch (error) {
    return res.status(500).json({ message: "Ojdå, något gick fel" });
  }
};

//Export functions
module.exports = {
  getAllTickets,
  newTicket,
  getOneTicket,
  deleteTicket,
};

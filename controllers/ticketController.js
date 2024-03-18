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

//Export functions
module.exports = {
  getAllTickets,
  newTicket,
  getOneTicket,
};

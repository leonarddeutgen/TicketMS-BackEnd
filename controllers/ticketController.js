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

//Create new tickets
const newTicket = async (req, res) => {
  const { name, title, description, orderNo, itemNo, puoNo, color, done } =
    req.body;

  try {
    await Ticket.create({
      name,
      title,
      description,
      orderNo,
      itemNo,
      puoNo,
      color,
      done,
    });

    res.status(201).json({ name });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//Edit ticket
const editTicket = async (req, res) => {
  const oneTicket = await Ticket.findOne({
    where: { id: req.params.id },
  });
  oneTicket.id = req.body.id;
  oneTicket.name = req.body.name;
  oneTicket.title = req.body.title;
  oneTicket.description = req.body.description;
  oneTicket.orderNo = req.body.orderNo;
  oneTicket.itemNo = req.body.itemNo;
  oneTicket.puoNo = req.body.puoNo;
  oneTicket.color = req.body.color;
  oneTicket.done = req.body.done;
  await oneTicket.save();
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
  editTicket,
  deleteTicket,
};

//Importo modelo de datos
const db = require("../models");
const tickets = db.ticket;
const Op = db.Sequelize.Op; //Import all ORM sequelize functions 

var clienteModel  = require('../models').cliente;  //Add for dependency response

const ticketController = {}; //Create the object controller

//CRUD end-points Functions
//-------------------------------------------------------------------------------------
//GET all tickets from database
ticketController.getAll = (req, res) => {
    
    tickets.findAll({include: [{ model:clienteModel}]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tickets."
        });
      });
  };


//-------------------------------------------------------------------------------------
//GET tickets by Id from database
ticketController.getById = (req, res) => {
    const id = req.params.id;

    tickets.findByPk(id, {include: [{ model:clienteModel}]})
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving tickets with id=" + id
        });
      });
  };



//-------------------------------------------------------------------------------------
//CREATE a new ticket in database
ticketController.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a tickets
    const newticket = {
      title: req.body.title,
      clienteId: req.body.clienteId
    };
  
    // Save tickets in the database
    tickets.create(newticket)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the ticket."
        });
      });
  };


//-------------------------------------------------------------------------------------
//UPDATE a ticket from database
ticketController.update = (req, res) => {
    const id = req.params.id;
  
    tickets.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ticket was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update ticket with id=${id}. Maybe ticket was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating ticket with id=" + id
        });
      });
  };


//-------------------------------------------------------------------------------------
//GET ticket by Title from database 
//FindByTitle
  ticketController.getByTitle = (req, res) => {
    tickets.findAll({ where: { title: req.params.title } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };


//-------------------------------------------------------------------------------------
//DELETE a ticket by Id from database
ticketController.delete = (req, res) => {
    const id = req.params.id;
  
    tickets.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ticket was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete ticket with id=${id}. Maybe ticket was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete ticket with id=" + id
        });
      });
  };


//-------------------------------------------------------------------------------------
//DELETE all tickets from database
//delete all tickets 
  ticketController.deleteAll = (req, res) => {
    tickets.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} tickets were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tickets."
        });
      });
  };

module.exports = ticketController;
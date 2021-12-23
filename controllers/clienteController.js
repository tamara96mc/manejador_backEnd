//Importo modelo de datos
const db = require("../models");
const clientes = db.cliente;
const Op = db.Sequelize.Op; //Import all ORM sequelize functions 

var jiraModel  = require('../models').jira;  //Add for dependency response

const clienteController = {}; //Create the object controller

//CRUD end-points Functions
//-------------------------------------------------------------------------------------
//GET all clientes from database
clienteController.getAll = (req, res) => {
    
    clientes.findAll({include: [{ model:jiraModel}]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving clientes."
        });
      });
  };


//-------------------------------------------------------------------------------------
//GET clientes by Id from database
clienteController.getById = (req, res) => {
    const id = req.params.id;

    clientes.findByPk(id, {include: [{ model:jiraModel}]})
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
          message: "Error retrieving clientes with id=" + id
        });
      });
  };



//-------------------------------------------------------------------------------------
//CREATE a new cliente in database
clienteController.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a clientes
    const newcliente = {
      title: req.body.title,
      jiraId: req.body.jiraId
    };
  
    // Save clientes in the database
    clientes.create(newcliente)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the cliente."
        });
      });
  };


//-------------------------------------------------------------------------------------
//UPDATE a cliente from database
clienteController.update = (req, res) => {
    const id = req.params.id;
  
    clientes.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "cliente was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update cliente with id=${id}. Maybe cliente was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating cliente with id=" + id
        });
      });
  };


//-------------------------------------------------------------------------------------
//GET cliente by Title from database 
//FindByTitle
  clienteController.getByTitle = (req, res) => {
    clientes.findAll({ where: { title: req.params.title } })
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
//DELETE a cliente by Id from database
clienteController.delete = (req, res) => {
    const id = req.params.id;
  
    clientes.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "cliente was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete cliente with id=${id}. Maybe cliente was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete cliente with id=" + id
        });
      });
  };


//-------------------------------------------------------------------------------------
//DELETE all clientes from database
//delete all clientes 
  clienteController.deleteAll = (req, res) => {
    clientes.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} clientes were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all clientes."
        });
      });
  };

module.exports = clienteController;
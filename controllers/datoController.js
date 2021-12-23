//Importo modelo de datos
const db = require("../models");
const datos = db.dato;
const Op = db.Sequelize.Op; //Import all ORM sequelize functions 

var clienteModel  = require('../models').cliente;
var campoModel  = require('../models').campo;  //Add for dependency response

const datoController = {}; //Create the object controller

//CRUD end-points Functions
//-------------------------------------------------------------------------------------
//GET all datos from database
datoController.getAll = (req, res) => {
    
    datos.findAll({include: [{ model:clienteModel}, { model:campoModel}]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving datos."
        });
      });
  };


//-------------------------------------------------------------------------------------
//GET datos by Id from database
datoController.getById = (req, res) => {
    const id = req.params.id;

    datos.findByPk(id, {include: [{ model:clienteModel}, { model:campoModel}]})
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
          message: "Error retrieving datos with id=" + id
        });
      });
  };



//-------------------------------------------------------------------------------------
//CREATE a new dato in database
datoController.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a datos
    const newdato = {
      title: req.body.title,
      clienteId: req.body.clienteId
    };
  
    // Save datos in the database
    datos.create(newdato)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the dato."
        });
      });
  };


//-------------------------------------------------------------------------------------
//UPDATE a dato from database
datoController.update = (req, res) => {
    const id = req.params.id;
  
    datos.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "dato was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update dato with id=${id}. Maybe dato was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating dato with id=" + id
        });
      });
  };


//-------------------------------------------------------------------------------------
//GET dato by Title from database 
//FindByTitle
  datoController.getByTitle = (req, res) => {
    datos.findAll({ where: { title: req.params.title } })
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
//DELETE a dato by Id from database
datoController.delete = (req, res) => {
    const id = req.params.id;
  
    datos.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "dato was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete dato with id=${id}. Maybe dato was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete dato with id=" + id
        });
      });
  };


//-------------------------------------------------------------------------------------
//DELETE all datos from database
//delete all datos 
  datoController.deleteAll = (req, res) => {
    datos.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} datos were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all datos."
        });
      });
  };

module.exports = datoController;
//Importo modelo de datos
const db = require("../models");
const campos = db.campo;
const Op = db.Sequelize.Op; //Import all ORM sequelize functions 

var jiraModel  = require('../models').jira;  //Add for dependency response

const campoController = {}; //Create the object controller

//CRUD end-points Functions
//-------------------------------------------------------------------------------------
//GET all campos from database
campoController.getAll = (req, res) => {
    
    campos.findAll({include: [{ model:jiraModel}]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving campos."
        });
      });
  };


//-------------------------------------------------------------------------------------
//GET campos by Id from database
campoController.getById = (req, res) => {
    const id = req.params.id;

    campos.findByPk(id, {include: [{ model:jiraModel}]})
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
          message: "Error retrieving campos with id=" + id
        });
      });
  };



//-------------------------------------------------------------------------------------
//CREATE a new campo in database
campoController.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a campos
    const newcampo = {
      title: req.body.title,
      jiraId: req.body.jiraId
    };
  
    // Save campos in the database
    campos.create(newcampo)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the campo."
        });
      });
  };


//-------------------------------------------------------------------------------------
//UPDATE a campo from database
campoController.update = (req, res) => {
    const id = req.params.id;
  
    campos.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "campo was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update campo with id=${id}. Maybe campo was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating campo with id=" + id
        });
      });
  };


//-------------------------------------------------------------------------------------
//GET campo by Title from database 
//FindByTitle
  campoController.getByTitle = (req, res) => {
    campos.findAll({ where: { title: req.params.title } })
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
//DELETE a campo by Id from database
campoController.delete = (req, res) => {
    const id = req.params.id;
  
    campos.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "campo was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete campo with id=${id}. Maybe campo was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete campo with id=" + id
        });
      });
  };


//-------------------------------------------------------------------------------------
//DELETE all campos from database
//delete all campos 
  campoController.deleteAll = (req, res) => {
    campos.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} campos were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all campos."
        });
      });
  };

module.exports = campoController;
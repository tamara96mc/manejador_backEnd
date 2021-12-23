//Importo modelo de datos
const db = require("../models");
const proyectos = db.proyecto;
const Op = db.Sequelize.Op; //Import all ORM sequelize functions 

var jiraModel  = require('../models').jira;  //Add for dependency response

const proyectoController = {}; //Create the object controller

//CRUD end-points Functions
//-------------------------------------------------------------------------------------
//GET all proyectos from database
proyectoController.getAll = (req, res) => {
    
    proyectos.findAll({include: [{ model:jiraModel}]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving proyectos."
        });
      });
  };


//-------------------------------------------------------------------------------------
//GET proyectos by Id from database
proyectoController.getById = (req, res) => {
    const id = req.params.id;

    proyectos.findByPk(id, {include: [{ model:jiraModel}]})
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
          message: "Error retrieving proyectos with id=" + id
        });
      });
  };



//-------------------------------------------------------------------------------------
//CREATE a new proyecto in database
proyectoController.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a proyectos
    const newproyecto = {
      title: req.body.title,
      jiraId: req.body.jiraId
    };
  
    // Save proyectos in the database
    proyectos.create(newproyecto)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the proyecto."
        });
      });
  };


//-------------------------------------------------------------------------------------
//UPDATE a proyecto from database
proyectoController.update = (req, res) => {
    const id = req.params.id;
  
    proyectos.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "proyecto was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update proyecto with id=${id}. Maybe proyecto was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating proyecto with id=" + id
        });
      });
  };


//-------------------------------------------------------------------------------------
//GET proyecto by Title from database 
//FindByTitle
  proyectoController.getByTitle = (req, res) => {
    proyectos.findAll({ where: { title: req.params.title } })
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
//DELETE a proyecto by Id from database
proyectoController.delete = (req, res) => {
    const id = req.params.id;
  
    proyectos.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "proyecto was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete proyecto with id=${id}. Maybe proyecto was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete proyecto with id=" + id
        });
      });
  };


//-------------------------------------------------------------------------------------
//DELETE all proyectos from database
//delete all proyectos 
  proyectoController.deleteAll = (req, res) => {
    proyectos.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} proyectos were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all proyectos."
        });
      });
  };

module.exports = proyectoController;
//Importo modelo de datos
const db = require("../models");
const jira = db.jira;
const Op = db.Sequelize.Op; //Import all ORM sequelize functions 

const JiraController = {}; //Create the object controller


//CRUD end-points Functions
//-------------------------------------------------------------------------------------
//GET all categories from database
JiraController.getAll = (req, res) => {
    const type = req.query.type;
    var condition = type ? { type: { [Op.like]: `%${type}%` } } : null;
  
    jira.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving categories."
        });
      });
  };


//-------------------------------------------------------------------------------------
//GET categories by Id from database
JiraController.getById = (req, res) => {
    const id = req.params.id;
  
    jira.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find jira with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving categories with id=" + id
        });
      });
  };


//-------------------------------------------------------------------------------------
//CREATE a new jira in database
JiraController.create = (req, res) => {
    // Validate request
    if (!req.body.type) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a jira
    const newjira = {
      type: req.body.type,
      age: req.body.age
    };
  
    // Save jira in the database
    jira.create(newjira)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the newjira."
        });
      });
  };


//-------------------------------------------------------------------------------------
//UPDATE a jira from database
JiraController.update = (req, res) => {
    const id = req.params.id;
  
    jira.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "jira was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update jira with id=${id}. Maybe Movie was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating jira with id=" + id
        });
      });
  };


//-------------------------------------------------------------------------------------
//GET categories by Type from database  
//FindByType
JiraController.getByType = (req, res) => {
    jira.findAll({ where: { type: req.params.type } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving categories."
        });
      });
  };


//-------------------------------------------------------------------------------------
//DELETE a jira by Id from database
JiraController.delete = (req, res) => {
    const id = req.params.id;
  
    jira.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "jira was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete jira with id=${id}. Maybe Movie was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete jira with id=" + id
        });
      });
  };


//-------------------------------------------------------------------------------------
//DELETE all categories from database
//delete all categories   
JiraController.deleteAll = (req, res) => {
    jira.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} categories were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all categories."
        });
      });
  };

module.exports = JiraController;
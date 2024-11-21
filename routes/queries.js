const express = require('express');
const faqsController = require('../controllers/queries');
//----------------------------------->

//Router
const Router = express.Router();

Router.route('/').post(faqsController.addQuery).get(faqsController.getQuery);


Router.route('/:id').patch(faqsController.updateQuery).post(faqsController.deleteQuery);

Router.route('/get/all').get(faqsController.showallQueries);


//Export----------------------------->
module.exports = Router;
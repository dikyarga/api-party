var express = require('express');
var router = express.Router();
var userController = require('../../controllers/users')
var helper = require('../../helpers/auth')


/* GET users listing. */
router.get('/', helper.isAdmin, userController.all);

// Get one user by ID
router.get('/:id', userController.show)

// Store a new user
router.post('/', helper.isAdmin, userController.create)

// Update data of a user
router.put('/:id', helper.isAdmin, userController.update)

// delete a user
router.delete('/:id', userController.delete)

module.exports = router;

const express = require('express')
const usersController = require('../../controllers/usersController')
const router = express.Router()
const ROLES_LIST = require('../../config/rolesList')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
  .get(usersController.getAllUsers)
  // .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser)

router.route('/:id').get(verifyRoles(ROLES_LIST.Admin), usersController.getUser)

module.exports = router

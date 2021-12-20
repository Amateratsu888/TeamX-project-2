const router = require("express").Router()
const usersControllers = require("../controllers/user.controllers")

//endpoints mise en place pour user
router.get('/users', usersControllers.getAllUsers)
router.get('/user/:id', usersControllers.getOneUser)
router.post('/user', usersControllers.postUser)
router.delete('/user/:id', usersControllers.deleteUser)
router.patch('/user/:id', usersControllers.patchUser)


//exportation de nos routes
module.exports = router
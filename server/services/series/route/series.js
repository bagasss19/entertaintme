const route = require('express').Router()
const Controller = require('../controller/controller')


route.get('/', Controller.read)
route.post('/', Controller.create)
route.put('/:id', Controller.update)
route.delete('/:id', Controller.delete)


module.exports = route
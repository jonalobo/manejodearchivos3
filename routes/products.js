const { Router } = require('express')
const {obtenerProductos} = require('../controller/controllerProducts')

const rutaProductos = Router()

rutaProductos.get('/', obtenerProductos)

module.exports = rutaProductos
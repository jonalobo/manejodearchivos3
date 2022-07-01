const { Router } = require('express')
const { obtenerProductoRandom } = require('../controller/controllerProducts')

const rutaProductoRandom = Router()

rutaProductoRandom.get('/', obtenerProductoRandom)

module.exports = rutaProductoRandom
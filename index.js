const express = require('express')
const cors = require('cors')
const rutaProductos = require('./routes/products')
const rutaProductoRandom = require('./routes/productRandom')



const app = express()

const PORT = 8000

app.use(express.json())

//Rutas
app.use('/productos', rutaProductos)
app.use('/productoRandom', rutaProductoRandom)


app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})



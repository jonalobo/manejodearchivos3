const fs = require('fs')
const express = require('express')


const app = express()
app.use(express.json())

app.get('/productos',async (req,res)=>{
    console.log(apiLeer('productos'))
    
    res.end()
})

app.listen(8080,()=>{
    console.log('servidor en línea')
})

let productos = []

let acumulador = 0

class Contenedor {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo
    }
    //Métodos
    save(title, price, thumbnail){
        let id = acumulador + 1
        acumulador++ 
        const producto = {
            title,
            price,
            thumbnail,
            id
        }
        productos.push(producto)
        console.log(id)
        sobreEscribir(this.nombreArchivo,JSON.stringify(productos))
    }
    getById(idObjeto){
        productos.forEach(objeto => {
            const productoId = objeto.id

            if (productoId === id) {
               console.log(objeto)
            }
        })  
        productos.find(objeto => {
            /* console.log(objeto.id) */
            if (objeto.id == idObjeto) {
                console.log(objeto)
            } 
        })
    }
    getAll(){
        console.log(productos)
        leer(this.nombreArchivo)
    }
    deleteById(id){
        productos.forEach(objeto => {
            const productoId = objeto.id

            if (productoId === id) {
               const pos = productos.indexOf(objeto)
               productos.splice(pos,1)
               sobreEscribir(this.nombreArchivo,JSON.stringify(productos))
            }
        })
    }
    deleteAll(){
        productos = []
        console.log(productos)
        sobreEscribir(this.nombreArchivo,JSON.stringify(productos))
    }
}




function leer(nombreArchivo) {
    fs.promises.readFile(`${nombreArchivo}.txt`,'utf-8')
    .then( contenido => {
        console.log(contenido)
    })
}
function apiLeer(nombreArchivo) {
    fs.promises.readFile(`${nombreArchivo}.txt`,'utf-8')
    .then( res => {
       return JSON.parse(res)
    })
}

async function sobreEscribir(nombreArchivo,productos) {
    try {
        await fs.promises.writeFile(`${nombreArchivo}.txt`,`${productos}`)
        console.log('agregado al documento')
    } catch (error) {
        console.log(error)
    }
}


//Productos
/* const producto1 = new Contenedor('productos')
producto1.save('microondas',250,'http://demo/microondas') */
/* producto1.getById(1) */
/* producto1.getAll() */


/* const producto2 = new Contenedor('productos')
producto2.save('televisor',500,'http://demo/tv') */
/* producto2.getById(2) */
/* producto2.getAll() */


/* const producto3 = new Contenedor('productos')
producto3.save('cocina',1500,'http://demo/cocina') */
/* producto3.deleteById(1) */
/* producto3.getById(3) */
/* producto3.getAll() */
/* producto3.deleteById(2)
producto2.deleteById(1) */
const express = require('express')
const res = require('express/lib/response')
const fs = require('fs')


let contador = 0
let productos = []

class Contenedor {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo
    }
    save(title, price, thumbnail){
        const id = ++contador
        const producto = {
            title,
            price,
            thumbnail,
            id
        }
        productos.push(producto)
        escribir(JSON.stringify(productos))
    }
    getById(id){
        leer(id)
    }
    getAll(){
        leerTodos()
    }
    deleteById(id){
        borrarId(id)
    }
    deleteAll(){
        borrarTodo()
    }
}

async function escribir(productos) {
    try {
        const escribirDocumento = await fs.promises.writeFile('./productos.txt',productos)
        console.log('Guardado con éxito')
    } catch (error) {
        throw new Error(error)
    }
}
async function leer(id) {
    try {
    const lectura = await fs.promises.readFile('./productos.txt', 'utf-8')
    .then(data =>{
        
        const  obtenerId = JSON.parse(data)
        /* obtenerId.forEach(element => {
            console.log(element.id)
        }); */
        const demo = obtenerId.filter(objeto =>{
            if (objeto.id == id) {
                console.log(objeto)
            }
        })
    })
    } catch (error) {
        console.log(error)
    }
}
async function leerTodos() {
    try {
        const todos = await fs.promises.readFile('./productos.txt', 'utf-8')
        .then(data =>{
            console.log(data)
        })
    } catch (error) {
        console.log(error)
    }
}
async function borrarId(id){
    let productos = []
    try {
        const result = fs.promises.readFile('./productos.txt', 'utf-8')
        .then(data=>{
            const datos = (JSON.parse(data))
            datos.forEach(element => {
                
                if (element.id === id) {
                    /* console.log('demo') */
                } else {
                    productos.push(element)
                }
            });
            escribir(JSON.stringify(productos))
        })
    } catch (error) {
        console.log(error)
    }
}
async function borrarTodo() {
    try {
        const result = fs.promises.readFile('./productos.txt', 'utf-8')
        .then(data=>{
            const datos = JSON.parse(data)
            productos = []
            escribir(JSON.stringify(productos))
        })
    } catch (error) {
        console.log(error)
    }
}

const obtenerProductos = async (req,res)=>{
    try {
        const todos = await fs.promises.readFile('./productos.txt', 'utf-8')
        .then(data =>{
            res.send(JSON.parse(data))
        })
    } catch (error) {
        console.log(error)
    }  
}
const obtenerProductoRandom = async (req,res)=>{
    try {
        const todos = await fs.promises.readFile('./productos.txt', 'utf-8')
        .then(data =>{
            const porId = JSON.parse(data)
            const numero =  Math.round(Math.random()*3)
            porId.forEach(element => {
                if (element.id == numero) {
                    res.send(element)
                }
            })
        })
    } catch (error) {
        console.log(error)
    }  
}



module.exports = {
    Contenedor,
    obtenerProductos,
    obtenerProductoRandom
}
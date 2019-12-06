const express = require('express')
const router = express.Router()
const mongoose = require('mongoose') //carrega o modulo monggose
require("../models/categoria") // importa a tabela categoria da pasta models
const Categoria = mongoose.model("categorias") // atribui a constante Categoria a tabela categorias

router.get('/',(req,res)=>{
    res.render('admin/index')
})

router.get('/posts',(req,res)=>{
    res.send('Pagina de posts')
})

router.get('/categorias',(req,res)=>{
    res.render('admin/categorias')
})

router.get('/categorias/add',(req,res)=>{
    res.render('admin/addcategorias')
})

router.post('/categorias/add',(req,res)=>{
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }
    
    new Categoria(novaCategoria).save().then(()=>{
        console.log("Categoria salva com sucesso")
    }).catch((err)=>{
        console.log('Erro ao criar nova categoria' +err)
    })
      
})

module.exports = router
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

// read
router.get('/categorias',(req,res)=>{
    Categoria.find().sort({date:'desc'}).then((categorias)=>{
        res.render('admin/categorias',{categorias:categorias})
    }).catch((erro)=>{
        req.flash("error_msg","Houve um erro")
        res.redirect('/admin')
    })
})

router.get('/categorias/add',(req,res)=>{
    res.render('admin/addcategorias')
})

router.post('/categorias/nova',(req,res)=>{
    var erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined|| req.body.nome == null){
        erros.push({texto: "Nome invalido"})
    }

    if(req.body.nome.length < 2){
        erros.push({texto:"Nome da categoria muito pequeno"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined|| req.body.slug == null){
        erros.push({texto: "Slug invalido"})
    }

    if(erros.length > 0){
        res.render("admin/addcategorias",{erros: erros})
    }else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
        
        new Categoria(novaCategoria).save().then(()=>{
            req.flash("success_msg","Categoria criada com sucesso")
            res.redirect('/admin/categorias')
        }).catch((err)=>{
            req.flash("error_msg","Falha ao criar a categoria")
            res.redirect('/adim')
        })
    }
      
})

module.exports = router
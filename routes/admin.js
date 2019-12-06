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

// create
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

//update
router.get('/categorias/edit/:id',(req,res)=>{
    Categoria.findOne({_id: req.params.id}).then((categoria)=> {
        res.render('admin/editcategoria',{categoria:categoria})
    }).catch((erro)=> {
        req.flash("error_msg",'Essa categoria não existe')
        res.redirect('/admin/categorias')
    })
})

router.post('/categorias/edit',(req,res)=>{
    Categoria.findOne({_id:req.body.id}).then((categoria)=>{
        categoria.nome =  req.body.nome,
        categoria.slug = req.body.slug

        categoria.save().then(()=>{
            req.flash('success_msg',"Categoria editada com sucesso")
            res.redirect('/admin/categorias')
        }).catch((erro)=>{
            req.flash('error_msg',"Erro ao editar a categoria")
            res.redirect('/admin/categorias')
        })

    }).catch((erro)=>{
        req.flash('error_msg',"Houve um erro ao editar a categoria")
        res.redirect('/admin/categorias')
    })
})



module.exports = router
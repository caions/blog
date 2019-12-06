//carregando modulos
const express = require('express');
const bodyParser = require('body-parser')
const handlebars  = require('express-handlebars');
const admin = require('./routes/admin');
const mongoose = require('mongoose');
const app = express();
const path = require('path')

//config 
   //body-parser
   app.use(bodyParser.urlencoded({ extended: true }))
   app.use(bodyParser.json())

   //handlebars
   app.engine('handlebars', handlebars({defaultLayout:'main'}));
   app.set('view engine', 'handlebars');

   //mongoose
   mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true,useUnifiedTopology: true});

   //public
   app.use(express.static(path.join(__dirname,"public")))

 //rotas
    app.use('/admin',admin)
 //outros
const PORT = 8083;
app.listen(PORT,()=>console.log('Servidor rodando na porta '+PORT))
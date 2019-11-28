const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categorias = new Schema({

    Categoria: {
        type: String,
        require: true
    },
    Slug: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }

});

const Categoria = mongoose.model("Categorias",Categorias)


module.exports = Categoria


const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Aluno = new Schema({
    nome: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})
//exportando model
mongoose.model("alunos", Aluno)
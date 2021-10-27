const express = require("express")
const router = express.Router()//função para criar rotas em arquivos separados
//usando model de forma externa dentro do mongoose
    const mongoose = require("mongoose")//importa o mongoose
    require("../models/Aluno") //require o arquivo do model
    const Aluno = mongoose.model("alunos")// estancia a referência do model para uma variável

router.get('/', (req, res)=>{// Rota Principal alunos
    Aluno.find().lean().then((alunos)=>{
        res.render("alunos", {alunos: alunos})
    }).catch((erro)=>{
        console.log(`Erro ao listar alunos: ${erro}`)
        res.redirect('/')
    })    
})

router.get('/cadastro',(req, res)=>{
    res.render('cadastro')
})
// criando um novo cadastro de aluno
router.post('/cadastro/novo', (req, res)=>{
    const novoAluno = {
        nome: req.body.nome,
        email: req.body.email
    }
    new Aluno(novoAluno).save().then(()=>{
        console.log("Aluno cadastrado")
    }).catch((erro)=>{
        console.log(`Erro ao cadastrar aluno: ${erro}`)
    })
    res.redirect("/alunos")
})
// editando um cadastro de aluno

router.get("/editar/:id", (req, res)=>{
    Aluno.findOne({_id:req.params.id}).lean().then((alunos)=>{
        res.render("editar", {alunos: alunos})
    }).catch((erro)=>{
        console.log(`Aluno inexistente: ${erro}`)
    })    
})
router.post("/editar",(req, res)=>{
    Aluno.findOne({_id: req.body.id}).then((alunos)=>{
        alunos.nome = req.body.nome
        alunos.email = req.body.email
        alunos.save().then(()=>{
            console.log("Aluno editado")
            res.redirect("/alunos")
        })
    })
})
// deletando aluno
router.post("/deletar", (req, res)=>{
    Aluno.deleteOne({_id: req.body.id}).then(()=>{
        console.log("Aluno deletado")
        res.redirect("/alunos")
    }).catch((erro)=>{
        console.log(`Erro ao deletar aluno: ${erro}`)
        res.redirect("/alunos")
    })
})
/*
router.get("/deletar/:id", (req, res)=>{
    Aluno.remove({_id: req.params.id}).then(()=>{
        res.redirect("/alunos")
    })
})
*/


module.exports = router
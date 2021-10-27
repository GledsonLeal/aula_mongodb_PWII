const express = require("express")// https://expressjs.com/
const handlebars = require("express-handlebars")// template engine https://handlebarsjs.com/
const app = express()// instância do express
const alunos  = require("./routers/alunos")// setando as rotas que estão no arquivo admin
const path = require("path")//módulo fornece utilitários para trabalhar com caminhos de arquivo e diretório. https://nodejs.org/api/path.html 
const port = 8081
const mongoose = require("mongoose")//https://mongoosejs.com/
const moment = require("moment")// https://momentjs.com/docs/


//Conectando com o Banco de dados MongoDB
mongoose.Promise = global.Promise;//Promise é um objeto usado para processamento assíncrono
mongoose.connect('mongodb://localhost/cadastro',{// cadastro é o nome do banco
        useNewUrlParser: true , 
        useUnifiedTopology: true
}).then(()=>{
        console.log("conectado ao MongoDB...")
}).catch((erro)=>{
        console.log(`Erro ao conectar ao Banco MongoDB ${erro}`)
})
//body parser https://expressjs.com/en/resources/middleware/body-parser.html
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//handlebars
app.engine('handlebars', handlebars({
        defaultLayout: 'main',
        helpers: {
                formatDate:(date)=>{
                        return moment(date).format('DD/MM/YYY')
                }
        }
}))
app.set('view engine', 'handlebars')

//******ROTAS*********
app.get('/', (req, res)=>{
    res.render("index")
})
//definindo grupo de rotas alunos
app.use('/alunos', alunos)



app.listen(port, ()=>{
    console.log(`servidor rodando na url: http://localhost:${8081}`)
})
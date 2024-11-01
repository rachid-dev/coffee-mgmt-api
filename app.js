const express = require('express')
const path = require('path')
const productRoutes = require('./routes/Product')
const userRoutes = require('./routes/User')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

//Cross origins
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Connexion à la base de donnée
mongoose.set('strictQuery', false);

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
                {useNewUrlParser : true,
                useUnifiedTopology : true,
                })
                .then(()=> console.log("Connexion à MongoDB réussie !"))
                .catch(()=> console.log("Connexion à MongoDB échouée !"))


app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/products',productRoutes)
app.use('/auth',userRoutes)

module.exports = app;
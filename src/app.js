const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const path = require('path')

const express = require("express")

const hbs = require('hbs')

const app = express()

const port = process.env.PORT || 3000

app.set("view engine", "hbs")

app.set('views',path.join(__dirname,"../template/views"))

hbs.registerPartials(path.join(__dirname,"../template/partials"))

app.use(express.static(path.join(__dirname,"../public")))



app.get("",(req,res)=>{
    res.render('index',{
        title:"weather",
        name:"Vishal Sharma"
    })
})

app.get("/about",(req,res)=>{
    res.render('about',{
        title:"weather",
        name:"Vishal Sharma"
    })
})

app.get("/help",(req,res)=>{
    res.render('help',{
        title:"weather",
        message:"Vishal Sharma"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Must provide the address to render weather information"
        })
    }
    
    
    geocode(req.query.address,(error,coordinates=[])=>{
        
        if(error){
            res.send({
                error
            })
        }
        else{

            forecast(coordinates[1],coordinates[0],(error,temperature)=>{
                if(error){
                    res.send({
                        error
                    })
                }
                else{
                    res.send(
                        {
                            latitude:coordinates[1],
                            longitude:coordinates[0],
                            location:req.query.address,
                            temperature

                        }
                    )
                }
                
            })

        }   
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        res.send({
            error:"You must provide search term"
        })

    }else{
        console.log(req.query.search)
        res.send({
            products:[]
        })
    }
    
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:"Error",
        name:"Vishal",
        message:"help not found"
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:"Error",
        name:"Vishal",
        message:"Page not found"
    })
})


app.listen(port,()=>{
    console.log("Server has been started started")
})
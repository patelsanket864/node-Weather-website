const geocode1=require('./utils/geocode.js')

const path=require('path')
const express =require('express')
const hbs=require('hbs')

const app=express()

//define paths to config express
const viewsPath=path.join(__dirname,'../templates/views')
const publicPath=path.join(__dirname,'../public')
const partialPath=path.join(__dirname,'../templates/partials')
//setup views location and handlebars
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Sanket Patel' 
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Dhruv patel'
    })
})

app.get('/help',(req,res)=>{
    res.render('Help',{
        title:'Help',
        name:'Sanket Patel'
    })
})

app.get('route.',(req,res)=>{
    res.send('route!')
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'Please provide Location'})
    }

const address=req.query.address
geocode1.geocode(address,(error,data)=>{
    if(error){
        res.send(error)

    }
    else{
        geocode1.Weather(data.latitude,data.longitude,(error,forecastdata)=>{
            if(error){
                res.send(error)
            }
            else{
                res.send({
                    forecast:forecastdata,
                    location:data.location,
                    address:req.query.address
                })
            }
        })
    }
   
})
    
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'I am here to help you',
        error:'help content not found',
        name:'Sanket Patel'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        error:'404 Page Not Found'
    })
})



app.listen(3000,()=>{
    console.log('server is up on port 3000')
})


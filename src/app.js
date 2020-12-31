const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const app = express();
const port = process.env.PORT || 3000 
// Define paths for express config
const publicDirectoryPath = path.join(__dirname,"../public"); 
const viewsPath = path.join(__dirname,"../templates/views");
const partialPath = path.join(__dirname,"../templates/partials");
//setup handelbars engine and Views location 
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);
//Setup static directory 
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
      title: 'Weather',
      name:'Muhammed Nasser'  
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Muhammed Nasser'
    });
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        message: 'message Example',
        name:'Muhammed Nasser'
    })
})
app.get('/Weather',(req,res)=>{
    if(!req.query.address) 
        return res.send({
            error: 'You must provide an address !!'
        });
    geocode(req.query.address,(error,locationInfo)=>{
        if(error) 
            return res.send({
            'Error': error
            });
        forcast(locationInfo,(error, weatherInfo)=>{
            if(error) return res.send({
                'Error': error
            });
            res.send({
                'main': weatherInfo.main,
                'description': weatherInfo.description,
                'address': req.query.address,
                'location':  weatherInfo.location
            })
        })
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404Page',{
        title: '404Page',
        errorMessage:'Cannot find help Article',
        name:'Muhammed Nasser'
    });
})
app.get('*',(req,res)=>{
    res.render('404Page',{
        title: '404Page',
        errorMessage:'PAGE NOT FOUND',
        name:'Muhammed Nasser'
    });
})
app.listen(port,()=>{
    console.log('server is up on port ' + port);
})
const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random',(req, res)=>{
    res.send(getRandomElement(quotes));
})

app.get('/api/quotes',(req,res)=>{
    const requestStr = req.query.person;
    if(!requestStr){
        res.send(quotes);
    }else{
        let resArray = quotes.filter((q)=>q.person === requestStr);
        res.send(resArray);
    }
})

app.post('/api/quotes',(req,res)=>{
    const newPerson = req.query.person;
    const newQuote = req.query.quote;
    if(newPerson && newQuote){
        const newObj = {
            quote: newQuote,
            person: newPerson
        }
        quotes.push(newObj);
        res.send(newObj);
    }else{
        res.status(400).send();
    }
})

app.listen(PORT, ()=>{
    console.log('Listening to port: ' + PORT);
})


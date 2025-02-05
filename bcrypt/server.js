const express = require('express');
const app = express();

const bcrypt = require('bcrypt');

app.use(express.json()); //allow app to accept json

const users = []

app.get('/users',(req, res)=>{
    res.json(users);
})

app.post('/users', async (req, res)=>{
    try{
        const salt = await bcrypt.genSalt(); //default is 10, if too big, this can take days to generate
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = {
            username: req.body.username,
            password:  hashedPassword
        }
        users.push(user);
        res.status(201).send();
    }catch(err){
        console.log(err);
        res.status(500).send();
    }
})

app.post('/users/login', async (req, res)=>{
    const user = users.find(user => user.username = req.body.username);
    //console.log('User we found in db is : '+ user.password);
    if(user === null) return res.status(400).send('User not found');
    console.log(user);
    try{
        console.log('username is : '+ user.username);
        console.log(req.body.password);
        console.log(user.password);
        if(await bcrypt.compare(req.body.password, user.password)){
            res.status(201).send('Success');
        }else{
            res.send('Not allowed');
        }
    }catch(err){
        res.status(500).send(err);
    }

})

app.listen(3000);
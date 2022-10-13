const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const { json } = require('express');
const bcrypt = require('bcryptjs');

require('dotenv').config();

app.use(express.json());

app.use(cors());

app.use(json());

//mongo connection 

const MONGO_URL= process.env.MONGODB_URL;

mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to DB");
});

mongoose.connection.on('error', (err) => {
    console.log("DB connection error: " + err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log("DB disconnected");
});
//schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
    },
    phone: {
        type: Number,
        required: [true, 'Please enter your phone number']
    },

    password: {
        type: String,
        required: [true, 'Please enter your password']
    },
});

const User = mongoose.model('User', userSchema);

//signup route

app.post('/signup', async (req, res) => {
    const {name, email,phone, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({message: "User already exists"});
    }
    else{
    const jwtsign = jwt.sign({password}, process.env.SECRET_KEY, {expiresIn: '1d'});
    const newUser = new User({name:name, email:email,phone:phone,password: jwtsign});
    await newUser.save();
    res.status(200).json({message: "User created successfully"});
    }
});

//login route

app.post('/login', async (req, res) => {
    const {email,phone, password} = req.body;
    const user = await User.findOne({email});

    if(!user){
        return res.status(401).json({message: "User does not exist!"});
    }
    const jwtverify = jwt.verify(user.password, process.env.SECRET_KEY);
    if(jwtverify.password !== password){
        return res.status(400).json({message: "Incorrect password!"});
    }
    else{
       return res.status(200).json({message: "Login successful!", user: user});
    }
});








//get users route
//dont enable this route in production!!!!!!!!!!!!!

// app.get('/users', async (req, res) => {
//     const users = await User.find();
//     res.json(users);
// });



//remove all users
//dont enable this route in production!!!!!!!!!!!!!
// app.get('/remove', async (req, res) => {
//     try{
//         await User.deleteMany({});
//         res.send("All users removed");
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error: "Server error"});
//     }
// });







//listening to port

const port =5000;

app.listen(port, () => console.log('Server Started at port '+port+'...'));
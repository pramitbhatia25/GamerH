const express = require('express')
const app = express()
const cors = require('cors')
const User = require('./models/user.model')
const mongoose = require('mongoose')
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://pramit25:Pram%40197058@cluster0.c8h77sx.mongodb.net/?retryWrites=true&w=majority')


app.post('/api/createUser', async (req, res) => {
	try {
		await User.create({
			name: req.body.name,
			handle: req.body.handle,
			steps: req.body.steps,
			ocr_steps: req.body.steps,
			email: req.body.email,
			pass: req.body.pass,
		})
		console.log("ok")
		res.json({ status: 'ok' })
	} catch (err) {
        console.log(err);
		res.json({ status: 'error', error: "HELO!!!!!API" })
	}
})

app.get('/api/fetchUsers', async (req, res) => {
    try {
        const users = await User.find();
		res.json({ status: 'ok', users:users})
    }
    catch(err)
    {
		res.json({ status: 'error', error: err })
    }
})

app.put('/api/updateApprovalStatus', async (req, res) => {
    let steps = req.body.steps;
    let email = req.body.email;
	try {
		await User.updateOne(
            {email: email},
            {$set: {steps: steps}}
		);
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: err })
	}

    console.log("Hi!")
})

app.put('/api/setOCRsteps', async (req, res) => {
    let ocr_steps = req.body.ocr_steps;
    let email = req.body.email;
	try {
		await User.updateOne(
            {email: email},
            {$set: {ocr_steps: ocr_steps}}
		);
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: err })
	}
    console.log(res.json)
    console.log("HiYA!")
})

app.post('/api/find', async (req, res) => {
        const email = req.body.email;
        try {
        const userLogin = await User.findOne({email:email});
        res.json({status: "ok", user: userLogin});       
        } catch(err) {
            res.json({status:"error", error: err})
    }
});

app.post('/api/login', async (req, res) => {
    try{
        const {email, pass} = req.body;

        if(!email || !pass){
            res.status(400).json({error:"field incomplete"});
        }

        const userLogin = await User.findOne({email:email});

        if(userLogin){
        const isMatch = pass === userLogin.pass;
        if(!isMatch){
            res.status(400).json({error:"user login unsuccesful"});
        }else{
            res.json({message:"user login succesful", userType: userLogin.userType});
        }}else{
            res.status(400).json({error:"user login unsuccesful"});
        }
        

    }catch (err) {
        console.log(err);
    }
});

app.listen(1337, () => {
	console.log('Server started on 1337')
})

import express from 'express';
import cors from 'cors';
import { user } from './db.js';
import { createUser, checkUser } from './types.js';
import sendEmail from './sendEmail.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    const emailExist = await user.findOne({email: email});

    if(!emailExist) {
        const createPayload = req.body;
        const parsedPayload = createUser.safeParse(createPayload);
        if(!parsedPayload.success) {
            res.status(411).json({
            msg: "you have send wrong inputs"
            });
        return
        }

        const response = await user.create({
        name: parsedPayload.data.name,
        email: parsedPayload.data.email,
        password: parsedPayload.data.password,
        authorised: false
        });

        console.log(response._id);
        console.log(email);
        console.log(parsedPayload.data.name);

    res.json("user created");

    try {
        await sendEmail(email, parsedPayload.data.name, response._id);
    } catch (error) {
        console.log(error);
    }

    } else {
        res.json("email already exist");
    }
})

app.put('/authorization', async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = checkUser.safeParse(updatePayload);
    if(!parsedPayload.success) {
        res.status(411).json({
            msg: "you have send wrong inputs"
        }); 
        return;
    }

    await user.findByIdAndUpdate({
        _id : updatePayload.id
    },{
        authorised: true,
    });
    res.json({
        msg: "user is active"
    })
    
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkEmail = await user.findOne({email: email});
        if(checkEmail) {
            if(checkEmail.authorised) {
                if(checkEmail.password === password) {
                    res.json("success")
                } else {
                    res.json("wrong password")
                }
            } else {
                res.json("email is not verified");
            }
        } else {
            res.json("email does not exists");
        }
    } catch (error) {
        res.json(error);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
import express from "express";

const User = require("../models/Users")

const userRoute = express.Router();

userRoute.get('/', async (req, res) => {
    try {
        let users = await User.find();
        res.json(users)
    } catch (error) {
        res.json(error);
    }
})

userRoute.get('/:id', async (req, res) => {
    try {
        let localuser = await User.findById(req.params.id)
        res.json(localuser);
    } catch (error) {
        res.json(error)
    }
})

userRoute.post('/', async (req, res) => {
    try {
        let newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        let userSave = await newUser.save()
        res.json(userSave)
    } catch (error) {
        res.json(error)
    }
});

userRoute.put('/:id', async (req, res) => {
    try {
        let userUpdate = await User.updateOne(
            {
                _id: req.params.id
            },
            {
                $set: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                }
            })
        res.json(userUpdate)
    } catch (error) {
        res.json(error)
    }
});

userRoute.delete('/:id', async (req, res) => {
    try {
        let userDelete = await User.deleteOne({ _id: req.params.id })
        res.json(userDelete);
    } catch (error) {
        res.json(error)
    }
})



export default userRoute;
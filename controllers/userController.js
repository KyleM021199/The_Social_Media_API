const { ObjectId } = require('mongoose').Types;
const {User, Thought} = require('../models');
//friendCount instance method
//to count the number of tied to the user
const friendCount = async () => {
    const numberOfFriends = await User.aggregate().count('friendCount');
    return numberOfFriends;
}
module.exports ={



//for /users route
// Get all users
async getUsers(req, res){
try{
const users = await User.find()
.populate({path: 'friends', select: '-__v'},{path: 'thoughts', select: '-__v'});

const userObj = {
    users,
    friendCount: await friendCount(), 
}
res.json(userObj);
}catch (err){
    console.log(err);
    return res.status(500).json(err);
}
},
// Get single user by id_
//populate friend and thought data
async getSingleUser(req, res){
    try{
    const user = await User.findOne({_id: req.params.userId})
    .populate({path: 'friends', select: '-__v'},{path: 'thoughts', select: '-__v'});
        if (!user){
            return res.status(404).json({ message: 'No user with that ID'});
        }
        res.json(user);
    }catch (err){
        console.log(err);
        return res.status(500).json(err);
    }
},

//Post a new user
async createUser(req, res) {
    try{

    }catch (err){
        console.log(err);
        return res.status(500).json(err);
    }
},

// Update a user by _id
async updateUser(req, res) {
    try{

    }catch (err){
        console.log(err);
        return res.status(500).json(err);
    }
},

//Delete a user by _id
async deleteUser(req, res) {
    try{

    }catch (err){
        console.log(err);
        return res.status(500).json(err);
    }
},
} 
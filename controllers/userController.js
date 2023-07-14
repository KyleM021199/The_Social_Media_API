
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
.select('-__v');



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
    .select('-__v')
    .populate('friends') 
    .populate('thoughts');
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
        const user = await User.create(req.body);
        res.json(user)
    }catch (err){
        console.log(err);
        return res.status(500).json(err);
    }
},

// Update a user by _id
async updateUser(req, res) {
    try{
        const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: req.body},
            {new: true}
            );
            if (!user){
                return res.status(404).json({ message: 'No user with that ID'});
            }
        res.json(user);
    }catch (err){
        console.log(err);
        return res.status(500).json(err);
    }
},

//Delete a user by _id
async deleteUser(req, res) {
    try{
    const user = await User.findOneAndDelete(
        {_id: req.params.userId},
        {$pull: req.body},
        );
        
        if(!user){
            return res.status(404).json({message: 'No user with this ID' });
        }
        await Thought.deleteMany({_id: {$in: user.thoughts}});
        res.json({message: 'User and thoughts deleted!'})
    }catch (err){
        console.log(err);
        return res.status(500).json(err);
    }
},

//Add a new friend to user
async addFriend(req, res){
    console.log('Adding a friend');
    console.log(req.body);
    try{
    const friend = await User.findOneAndUpdate(
    {_id: req.params.userId},
    { $addToSet: { friends: req.params.friendId } },
    {new: true}
    );
    if (!friend){
        return res.status(404).json({ message: 'No user with that ID'});
    }
    res.json(friend);
    }catch (err){
        console.log(err);
        return res.status(500).json(err);
    }
},


//Delete a friend from user
async removeFriend(req, res){
    try{
        const friend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { friendId: req.params.friendId } } },
            {new: true}  
        );
        if (!friend){
            return res.status(404).json({ message: 'No user with that ID'});
        }
        res.json(friend);
    }catch (err){
        console.log(err);
        return res.status(500).json(err);
    }

},
} 
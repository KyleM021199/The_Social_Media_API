const {User,Thought} = require('../models');
const reactionCount = async () => {
    const numberOfReactions = await Thought.aggregate().count('reactionCount');
    return numberOfReactions;
}
module.exports = {
    //for /thoughts route
    //Get all thoughts
    async getThoughts(req, res){
        try{
        const thoughts = await Thought.find()
        .select('-__v');
        
        const thoughtObj = {
            thoughts,
            numberOfReactions: await reactionCount(), 
        }
        res.json(thoughtObj);
        }catch (err){
            console.log(err);
            return res.status(500).json(err);
        }
    },
    
    //Get single thought by _id
    async getSingleThought(req, res){
        try{
        const thought = await Thought.findOne({_id: req.params.thoughtId})
        .select('-__v');
        
        res.json(thought);
        }catch (err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Post a new thought
    async createThought(req, res) {
        try{
            const thought = await Thought.create(req.body);
            res.json(thought)
        }catch (err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Update a thought
    async updateThought(req, res) {
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {new:true}
                );
                if(!thought){
                    return res.status(404).json({message: 'No thought with this ID' });
                }
            res.json(thought);
        }catch (err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Delete a thought 
    async deleteThought(req, res) {
        try{
        const thought = await Thought.findOneAndDelete(
            {_id: req.params.thoughtId},
            {$pull: req.body},
            {new: true}
                );
            
            if(!thought){
                return res.status(404).json({message: 'No thought with this ID' });
            }
        }catch (err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Create reaction
    async createReaction(req, res) {
        try{
        const thought = await Thought.findOneAndUpdate(    
        {_id: req.params.thoughtId},
        { $addToSet: { reactions: req.body } },
        {new: true}
        );
        if(!thought){
            return res.status(404).json({ message: 'No thought with that ID'});
        }
        res.json(thought);
        }catch (err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //Delete reaction
    async deleteReaction(req, res) {
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $pull: { reactions: { reactionId: req.params.reactionId} } },
                {new: true},
                );
        if(!thought){
            return res.status(404).json({ message: 'No thought with that ID'});
        }
        }catch (err){
            console.log(err);
            return res.status(500).json(err);
        }
    },
}
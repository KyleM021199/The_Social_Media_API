const {Schema, model} = require('mongoose');

//Thought Model
    //Thought Schema
    const thoughtSchema = new Schema(
        {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
        username:{
            type: String,
            required: true

        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
          },
          id: false,
        }
        
    );
    // date format method
    // thoughtSchema.get(function () {
    
    // });
    // Thought virtual property
//reaction virtual property
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });


    const Thought = model('thought', thoughtSchema);

    module.exports = Thought;
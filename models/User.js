const {Schema, Types} = require('mongoose');
//User Model
    //User Schema
const userSchema = new Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //WIP: email validation
        match: true,
    },
    thoughts:[ 
        {
            type: Schema.Types.ObjectId,
            ref:'Thought',
        },
      ],

      friends:[ 
        {
            type: Schema.Types.ObjectId,
            ref:'User',
        },
      ],
    }
);

// User virtual property
//friends virtual property
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;
const {Schema, model, Types} = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username must be provided',
        trim: true
    },

    email: {
        type: String,
        required: 'Email must be provided',
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    },     
    

    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }
    ],

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
},
{
    toJSON: {
        virtuals: true, 
    },
    id: false
});

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
}
);

const User = model('User', UserSchema);

module.exports = User;



import {Schema, model, Document, Types, ObjectId} from 'mongoose';

interface IReaction extends Document {
    reactionId: ObjectId;
    reactionBody: string;
    username: string;
    createdAt?: Date;
}

const reactionSchema = new Schema<IReaction>({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: Date) => { timestamp.toDateString().split('T')[0]}
    }
},
//QUESTION FOR TUTOR: WHY DID I HAVE TO MAKE A NEW OBJECT FOR THIS TO WORK?
{
    toJSON: {
        getters: true
    }
}
);

interface IThought extends Document {
  thoughtText : string;
  createdAt : Date;
  username : string;
  reactions : IReaction[]; // Use the reactionSchema to validate data - IM NOT SURE IF THIS IS CORRECT
}

const thoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  
  username: {
    type: String,
    required: true
},

    createdAt: {
        type: Date,
        default: Date.now()
        // Use a getter method to format the timestamp on query
    },
    reactions: [
        reactionSchema
    ]
},
{
  toJSON: {
    virtuals: true,
  },
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
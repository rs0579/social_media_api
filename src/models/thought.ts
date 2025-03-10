import {Schema, model, Document} from 'mongoose';
import reactionSchema from './reactions.js'; 


interface IThought extends Document {
  thoughtText : string;
  createdAt : Date;
  username : string;
  reactions : reactionSchema[]; // Use the reactionSchema to validate data - IM NOT SURE IF THIS IS CORRECT
}

const thoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal: Date) => dateFormat(createdAtVal)  // Use a getter method to format the timestamp on query
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
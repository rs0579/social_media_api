import {Schema, model, Document} from 'mongoose';


interface IThought extends Document {
  thoughtText : string;
  createdAt : Date;
  username : string;
  reactions : Reaction[];
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

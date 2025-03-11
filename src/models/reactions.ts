import {Schema, Document, ObjectId, Types} from 'mongoose';

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

export default reactionSchema;

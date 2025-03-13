import Thought from '../models/thought.js';
import User from '../models/user.js';
import { Request, Response } from 'express';

export const getThoughts =async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find({});
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const createThought = async (req: Request, res: Response) => {
    try {
        const thoughtText = await Thought.create(req.body
            //LINES 17 AND 18 ARE NOT NEEDED** THEY ARE SUPPOISED PUSH THE CREATED THOUGHT'S ID TO THE USER'S THOUGHTS ARRAY.
        );
        await User.findOneAndUpdate(req.body.userId, { $push: { thoughts: thoughtText._id } }, { new: true });

        res.json(thoughtText);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateThoughtById = async (req: Request, res: Response) => {
    //I DON'T KNOW IF I SHOULD MAKE A NEW VARIABLE TO HOLD THE THOUGHT ID IN THIS LOCAL SCOPE
    try {
        const thoughtText = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
        res.json(thoughtText);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

export const deleteThoughtById = async (req: Request, res: Response) => {
    //I DON'T KNOW IF I SHOULD MAKE A NEW VARIABLE TO HOLD THE THOUGHT ID IN THIS LOCAL SCOPE
    try{
        const thoughtId = await Thought.findByIdAndDelete(req.params.thoughtId);
        res.json(thoughtId);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
 export const createReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        return res.json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
}
    export const deleteReaction = async (req: Request, res: Response) => {
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: {reactionId: req.body.reactionId} } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            return res.json(thought);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
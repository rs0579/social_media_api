import User from '../models/user.js';
import { Request, Response } from 'express';

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    //THERE IS NO USERID IN THE MODEL
    try {
        const user = await User.findById(userId);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });

        }
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}
export const createUser = async (req: Request, res: Response) => {
    try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    try {
        //YOU HAVE TO USE AN ID BECAUSE IT IS GUARANTEED TO BE UNIQUE - WHEN TARGETING ID, YOU NEED THE REQ.PARAMS.ID 
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
           return res.status(404).json({ message: 'No user found with this id!' });
        }
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}
export const removeFriendById = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}
export const addFriend = async (req: Request, res: Response) => {
    console.log('You\'re adding a new friend!');
    console.log(req.body);
    try{
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}
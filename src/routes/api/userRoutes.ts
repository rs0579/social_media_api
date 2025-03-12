import {Router} from 'express';
import {getUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriendById} from '../../controller/userController';

const router = Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriendById);

export {router as userRoutes}
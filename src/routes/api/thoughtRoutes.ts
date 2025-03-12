import {Router} from 'express';
import { getThoughts, createThought, getThoughtById, updateThoughtById, deleteThoughtById, createReaction, deleteReaction } from '../../controller/thoughtController';

const router = Router();

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById);
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

export {router as thoughtRoutes}
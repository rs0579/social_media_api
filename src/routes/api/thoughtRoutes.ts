import {Router} from 'express';
import { getThoughts, createThought, getThoughtById, updateThoughtById, deleteThoughtById, createReaction, deleteReaction } from '../../controller/thoughtController.js';

const router = Router();

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtid').get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById);
router.route('/:thoughtid/reactions').post(createReaction).delete(deleteReaction);

export {router as thoughtRoutes}
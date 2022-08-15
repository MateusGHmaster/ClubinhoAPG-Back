import { Router } from 'express';
import { kidSchema, guardianSchema, presenceSchema } from '../schemas/kidSchema.js';
import { 
        kidRegistration, 
        kidPresence, 
        guardianRegistration, 
        getKidInfo, 
        getKidsList, 
        getCurrentPresenceState, 
        getKidsPresenceByDate, 
        getPresenceHistoryByKid,
        getPresenceDaysHistory,
        findKidById
        } from '../controllers/kidController.js';

import schemaValidate from '../middlewares/schemaValidate.js';

const kidRouter = Router();

kidRouter.post('/register-r', schemaValidate(guardianSchema), guardianRegistration);
kidRouter.post('/register-c', schemaValidate(kidSchema), kidRegistration);
kidRouter.post('/presence', schemaValidate(presenceSchema), kidPresence);
kidRouter.get('/presence', getCurrentPresenceState);
kidRouter.get('/kids', getKidsList);
kidRouter.get('/kid/:kidId', findKidById);
kidRouter.get('/kid-history/:id', getPresenceHistoryByKid);
kidRouter.get('/date-history/:date', getKidsPresenceByDate);
kidRouter.get('/days-history', getPresenceDaysHistory);
kidRouter.get('/info/:id', getKidInfo);

export default kidRouter;
import { Router } from 'express';
import { 
    draftCreate
} from 'controllers/compositions/index'
import { ensureUser } from 'middleware/ensureUser';
const router = Router();


router.post('/createDraft', [ensureUser], draftCreate);
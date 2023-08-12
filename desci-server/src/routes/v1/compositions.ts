import { Router } from 'express';
import { 
    draftCreate,
    list
} from 'controllers/compositions/index'
import { ensureUser } from 'middleware/ensureUser';
const router = Router();


router.get('/', [ensureUser], list);
router.post('/createDraft', [ensureUser], draftCreate);
export default router
import { Router } from 'express';
import {
  postLogin,
  getAuth,
} from '../../app/controller/loginController.mjs';
import auth from '../../app/middlewares/validate-jwt.mjs';
// import validateRole from '../../app/middlewares/validate-roles.mjs';
import validate from '../../app/middlewares/validate.mjs';
import loginSchema from '../../app/schemas/loginSchema.mjs';

const router = Router();

router.post('/', [validate(loginSchema)], postLogin);

// router.get('/auth', [auth, validateRole('ROLE_LIBRARIAN')], getAuth);
router.get('/auth', [auth], getAuth);

export default router;

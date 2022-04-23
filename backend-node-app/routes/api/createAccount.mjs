import { Router } from 'express';
import { postCreateUser } from '../../app/controller/createAccountController.mjs';
import validateRole from '../../app/middlewares/validate-roles.mjs';
import createAccountSchema from '../../app/schemas/createAccountSchema.mjs';
import validate from '../../app/middlewares/validate.mjs';

const router = Router();

router.post(
  '/',
  [validate(createAccountSchema), validateRole('ROLE_LIBRARIAN')],
  postCreateUser,
);

export default router;

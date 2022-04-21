import { Router } from 'express';
import {
  getBooksAvailable,
  postCreateBook,
  updateBook,
  deleteBook,
} from '../../app/controller/booksController.mjs';
import validate from '../../app/middlewares/validate.mjs';
import createNewBookSchema from '../../app/schemas/createNewBookSchema.mjs';
import updateBookSchema from '../../app/schemas/updateBookSchema.mjs';
import validateRole from '../../app/middlewares/validate-roles.mjs';

const router = Router();

router.get('/available', getBooksAvailable);

// xd router.get('/:isbn',);

router.post(
  '/',
  [validateRole('ROLE_LIBRARIAN'), validate(createNewBookSchema)],
  postCreateBook,
);

router.put(
  '/:isbn',
  [validateRole('ROLE_LIBRARIAN'), validate(updateBookSchema)],
  updateBook,
);

router.delete('/:isbn', [validateRole('ROLE_LIBRARIAN')], deleteBook);

export default router;

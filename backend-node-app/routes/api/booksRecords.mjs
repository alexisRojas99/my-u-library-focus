import { Router } from 'express';
import validate from '../../app/middlewares/validate.mjs';
import validateRole from '../../app/middlewares/validate-roles.mjs';
import {
  getBooksRecords,
  postCreateRecords,
  updateBookRecords,
} from '../../app/controller/booksRecordsController.mjs';
import createBooksRecordSchema from '../../app/schemas/createBooksRecordSchema.mjs';
import updateBooksRecordSchema from '../../app/schemas/updateBooksRecordSchema.mjs';

const router = Router();

router.get('/', getBooksRecords);
router.post(
  '/',
  [validateRole('ROLE_STUDENT'), validate(createBooksRecordSchema)],
  postCreateRecords,
);
router.put('/:id', [validate(updateBooksRecordSchema)], updateBookRecords);

// router.delete('/:isbn', [validateRole('ROLE_LIBRARIAN')], deleteBook);

export default router;

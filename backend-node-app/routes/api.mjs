import { Router } from 'express';
import login from './api/login.mjs';
import createAccount from './api/createAccount.mjs';
import auth from '../app/middlewares/validate-jwt.mjs';
import books from './api/books.mjs';
import booksRecords from './api/booksRecords.mjs';

const router = Router();

router.use('/login', login);
router.use('/create-account', [auth], createAccount);
router.use('/books', [auth], books);
router.use('/books-records', [auth], booksRecords);

export default router;

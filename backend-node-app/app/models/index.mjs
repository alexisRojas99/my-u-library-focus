import Users from './Users.mjs';
import Roles from './Roles.mjs';
import Books from './Books.mjs';
import BooksRecords from './BooksRecords.mjs';

Users.associate();
Roles.associate();
Books.associate();
BooksRecords.associate();
export {
  Users, Roles, Books, BooksRecords,
};

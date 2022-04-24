import { Op } from 'sequelize';
import HttpCode from '../../config/HttpCode.mjs';
import pagination from '../helpers/pagination.mjs';
import Books from '../models/Books.mjs';

const getBooksAvailable = async (req, res) => {
  const {
    author, title, genre, page, pageSize,
  } = req.query;
  const filter = {};
  if (author) {
    filter.author = { [Op.like]: `%${author.toUpperCase()}%` };
  }
  if (title) {
    filter.title = { [Op.like]: `%${title.toUpperCase()}%` };
  }
  if (genre) {
    filter.genre = { [Op.like]: `%${genre.toUpperCase()}%` };
  }
  let criterion = {
    where: {
      ...filter,
    },
  };
  if (page && pageSize) {
    criterion = pagination(criterion, { page, pageSize });
  }
  const dataBooks = await Books.findAll({ ...criterion, order: [['stock', 'DESC']] });
  const countAllBooks = await Books.count();
  return res
    .status(HttpCode.HTTP_OK)
    .json({ totalRecords: countAllBooks, dataBooks });
};

const postCreateBook = async (req, res) => {
  const {
    isbn,
    title,
    author,
    published_year: publishedYear,
    genre,
    stock,
  } = req.body;

  const data = {
    isbn: isbn.toUpperCase(),
    title: title.toUpperCase(),
    author: author.toUpperCase(),
    published_year: publishedYear,
    genre: genre.toUpperCase(),
    stock,
  };

  try {
    const createBook = await Books.create(data);
    return res.status(HttpCode.HTTP_OK).json({
      createBook,
    });
  } catch (error) {
    return res.status(HttpCode.HTTP_OK).json({
      message: error.errors[0].message,
    });
  }
};

const updateBook = async (req, res) => {
  const {
    title,
    author,
    genre,
    published_year: publishedYear,
    stock,
  } = req.body;
  const { isbn } = req.params;

  const data = {
    title: title.toUpperCase(),
    author: author.toUpperCase(),
    published_year: publishedYear,
    genre: genre.toUpperCase(),
    stock,
  };

  const validateUpdate = await Books.update(data, {
    where: {
      isbn,
    },
  });

  if (validateUpdate[0] === 0) {
    return res.status(HttpCode.HTTP_BAD_REQUEST).json({
      message: 'isbn not found ',
    });
  }

  return res.status(HttpCode.HTTP_OK).json({
    message: 'Update successful',
  });
};

const deleteBook = async (req, res) => {
  const { isbn } = req.params;

  const validateDelete = await Books.destroy({
    where: {
      isbn,
    },
  });

  if (validateDelete === 0) {
    return res.status(HttpCode.HTTP_BAD_REQUEST).json({
      message: 'isbn not found',
    });
  }

  return res.status(HttpCode.HTTP_OK).json({
    message: 'Delete successful',
  });
};

export {
  getBooksAvailable, postCreateBook, updateBook, deleteBook,
};

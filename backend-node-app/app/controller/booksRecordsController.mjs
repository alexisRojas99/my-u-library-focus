import { Op } from 'sequelize';
import moment from 'moment';
import HttpCode from '../../config/HttpCode.mjs';
import pagination from '../helpers/pagination.mjs';
import { Users, BooksRecords, Books } from '../models/index.mjs';

const getBooksRecords = async (req, res) => {
  const {
    isbn,
    id_user: idUser,
    movement_type: movementType,
    movement_date: movementDate,
    page,
    pageSize,
  } = req.query;

  const filter = {};

  if (isbn) {
    filter.isbn = isbn;
  }

  if (movementType) {
    filter.movement_type = movementType.toLowerCase();
  }
  if (movementDate) {
    const fulldate = new Date(movementDate);
    const date1 = new Date(
      fulldate.getFullYear(),
      fulldate.getMonth(),
      fulldate.getDate(),
      0,
      0,
      0,
      0,
    );
    const date2 = new Date(
      fulldate.getFullYear(),
      fulldate.getMonth(),
      fulldate.getDate(),
      23,
      59,
      59,
      0,
    );
    filter.movement_date = { [Op.gte]: date1, [Op.lte]: date2 };
  }
  if (idUser) {
    filter.id_user = idUser;
  }

  let criterion = {
    where: {
      ...filter,
    },
  };
  if (page && pageSize) {
    criterion = pagination(criterion, { page, pageSize });
  }
  const dataBooksRecords = await BooksRecords.findAll({
    ...criterion,
    order: [['movement_date', 'DESC']],
    include: [
      {
        model: Users,
        attributes: ['id', 'first_name', 'last_name', 'email'],
      },
      {
        model: Books,
      },
    ],
  });

  return res.status(HttpCode.HTTP_OK).json({
    dataBooksRecords,
  });
};

const postCreateRecords = async (req, res) => {
  const {
    id_user: idUser,
    isbn,
    quantity,
    movement_type: movementType,
  } = req.body;

  const data = {
    id_user: idUser,
    isbn: isbn.toUpperCase(),
    quantity: Number(quantity),
    movement_type: movementType.toLowerCase(),
    movement_date: moment().format(),
  };

  try {
    const createBookRecord = await BooksRecords.create(data);
    return res.status(HttpCode.HTTP_CREATED).json({
      createBookRecord,
    });
  } catch (error) {
    return res.status(HttpCode.HTTP_BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const updateBookRecords = async (req, res) => {
  const { id } = req.params;
  const {
    id_user: idUser,
    isbn,
    quantity,
    movement_type: movementType,
  } = req.body;

  const data = {
    id_user: idUser,
    isbn: isbn.toUpperCase(),
    quantity: Number(quantity),
    movement_type: movementType.toLowerCase(),
    movement_date: moment().format(),
  };
  try {
    const validateUpdate = await BooksRecords.update(data, {
      where: {
        isbn,
      },
    });

    if (validateUpdate === 0) {
      return res.status(HttpCode.HTTP_BAD_REQUEST).json({
        message: 'id not found',
      });
    }
  } catch (error) {
    return res.status(HttpCode.HTTP_BAD_REQUEST).json({
      message: error.message,
    });
  }

  return res.status(HttpCode.HTTP_OK).json({
    message: 'update successful',
  });
};

export { getBooksRecords, postCreateRecords, updateBookRecords };

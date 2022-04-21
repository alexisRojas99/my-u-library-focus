/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';
import HttpCode from '../../config/HttpCode.mjs';
import Roles from '../models/Roles.mjs';

const validateRole = (ROLE) => async (req, res, next) => {
  const dataRole = await Roles.findAll();

  const getRole = dataRole.find((element) => element.name === ROLE);

  if (!getRole) {
    return res.status(HttpCode.HTTP_OK).json({
      message: 'El Role no existe',
    });
  }
  const tokenString = req.header('authorization');

  const [_, token] = tokenString.split(' ');

  const { role } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

  const validate = getRole.id === role;

  if (!validate) {
    return res.status(HttpCode.HTTP_UNAUTHORIZED).json({
      message: 'UNAUTHORIZED',
    });
  }

  return next();
};

export default validateRole;

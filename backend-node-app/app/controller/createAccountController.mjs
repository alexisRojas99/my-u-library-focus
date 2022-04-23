import HttpCode from '../../config/HttpCode.mjs';
import Users from '../models/Users.mjs';
import encrypt from '../helpers/encrypt.mjs';

const postCreateUser = async (req, res) => {
  const {
    first_name: firstName,
    last_name: lastName,
    email,
    id_rol: idRol,
    password,
  } = req.body;

  const pwd = encrypt(password);

  const data = {
    first_name: firstName,
    last_name: lastName,
    email,
    id_rol: idRol,
    password: pwd,
  };

  try {
    const dataUser = await Users.create(data);
    return res.status(HttpCode.HTTP_CREATED).json({
      dataUser,
    });
  } catch (error) {
    return res.status(HttpCode.HTTP_OK).json({
      message: error.errors[0].message,
    });
  }
};

const another = () => {};

export { postCreateUser, another };

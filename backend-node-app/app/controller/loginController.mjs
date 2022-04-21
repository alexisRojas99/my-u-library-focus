import bcryptjs from 'bcryptjs';
import HttpCode from '../../config/HttpCode.mjs';
import Users from '../models/Users.mjs';
import generateJWT from '../helpers/generate-jwt.mjs';
// import encrypt from '../helpers/encrypt.mjs';

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const dataUser = await Users.findOne({
    where: {
      email,
    },
  });

  if (!dataUser) {
    return res.status(HttpCode.HTTP_NOT_FOUND).json({
      message: 'user not found',
    });
  }

  const validatePassword = await bcryptjs.compareSync(
    password,
    dataUser.password,
  );

  if (!validatePassword) {
    return res.status(HttpCode.HTTP_OK).json({
      message: 'wrong password',
    });
  }

  const payload = {
    email: dataUser.email,
    role: dataUser.id_rol,
  };

  const token = await generateJWT(payload);

  return res.status(HttpCode.HTTP_OK).json({
    token,
  });
};

const getAuth = async (req, res) => {
  const { userEmail, userRole } = req;
  return res.status(HttpCode.HTTP_OK).json({
    status: true,
    email: userEmail,
    role: userRole,
  });
};

export { postLogin, getAuth };

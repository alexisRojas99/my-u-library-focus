import jwt from 'jsonwebtoken';

const validateJWT = (req, res, next) => {
  const tokenString = req.header('authorization');
  // eslint-disable-next-line no-unused-vars
  const [_, token] = tokenString.split(' ');

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la request',
    });
  }

  try {
    const { email, role, id } = jwt.verify(
      token,
      process.env.SECRETORPRIVATEKEY,
    );

    req.userEmail = email;
    req.userRole = role;
    req.userId = id;

    return next();
  } catch (err) {
    return res.status(200).json({
      status: false,
    });
  }
};

export default validateJWT;

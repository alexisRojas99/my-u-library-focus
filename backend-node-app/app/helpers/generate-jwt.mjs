import jwt from 'jsonwebtoken';

const generateJWT = (uid = '') => new Promise((resolve, reject) => {
  const payload = uid;

  jwt.sign(
    payload,
    process.env.SECRETORPRIVATEKEY,
    {
      expiresIn: process.env.EXPIRES_IN_JWT,
      // header: {"msg": "Hola Mundo"},
      algorithm: 'HS512',
    },
    (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    },
  );
});

export default generateJWT;

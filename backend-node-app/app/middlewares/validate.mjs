import ajv from '../utils/ajv-instance.mjs';
import HttpCode from '../../config/HttpCode.mjs';

const validate = (schema, type = 'body') => {
  const ajvValidate = ajv.compile(schema);

  return (req, res, next) => {
    const valid = ajvValidate(req[type]);

    if (!valid) {
      const { errors } = ajvValidate;

      const respErrors = errors.map((err) => {
        const data = {};
        data.message = err.message;
        return data;
      });

      return res.status(HttpCode.HTTP_BAD_REQUEST).json(respErrors);
    }

    return next();
  };
};

export default validate;

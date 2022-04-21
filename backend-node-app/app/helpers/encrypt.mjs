import bcryptjs from 'bcryptjs';

const encrypt = (data) => {
  const salt = bcryptjs.genSaltSync();

  const cryptData = bcryptjs.hashSync(data, salt);

  return cryptData;
};

export default encrypt;

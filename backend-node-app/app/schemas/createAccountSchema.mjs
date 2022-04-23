const createAccountSchema = {
  type: 'object',
  properties: {
    first_name: {
      type: 'string',
      errorMessage: {
        type: 'The first_name must be string',
        isNotEmpty: 'The first_name cannot be empty',
      },
      isNotEmpty: true,
    },
    last_name: {
      type: 'string',
      errorMessage: {
        type: 'The last_name must be string',
        isNotEmpty: 'The last_name cannot be empty',
      },
      isNotEmpty: true,
    },
    email: {
      type: 'string',
      errorMessage: {
        type: 'The email must be string',
        isNotEmpty: 'The email cannot be empty',
      },
      isNotEmpty: true,
    },
    id_rol: {
      type: 'integer',
      minimum: 1,
      maximum: 2,
      errorMessage: {
        type: 'The id_rol must be integer',
        maximum: 'The id_rol cannot be greater than 2',
        minimum: 'The id_rol cannot be lower than 1',
      },
    },
    password: {
      type: 'string',
      errorMessage: {
        type: 'The password must be string',
        isNotEmpty: 'The password cannot be empty',
      },
      isNotEmpty: true,
    },
  },
  required: ['first_name', 'last_name', 'email', 'id_rol', 'password'],
  errorMessage: {
    required: {
      first_name: 'The first_name is required',
      last_name: 'The last_name is required',
      email: 'The email is required',
      id_rol: 'The id_rol is required',
      password: 'The password is required',
    },
  },
};

export default createAccountSchema;

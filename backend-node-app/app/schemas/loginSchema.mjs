const loginSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      errorMessage: {
        type: 'El email debe ser de tipo string',
      },
    },
    password: {
      type: 'string',
      errorMessage: {
        type: 'El campo password debe ser de tipo string',
      },
    },
  },
  required: ['email', 'password'],
  errorMessage: {
    required: {
      email: 'El email es requerido',
      password: 'El campo password es requerido',
    },
  },
};

export default loginSchema;

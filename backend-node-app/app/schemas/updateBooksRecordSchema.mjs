const updateBooksRecordSchema = {
  type: 'object',
  properties: {
    id_user: {
      type: 'integer',
      errorMessage: {
        type: 'The id_user must be integer',
      },
    },
    isbn: {
      type: 'string',
      minLength: 13,
      maxLength: 13,
      errorMessage: {
        type: 'The isbn must be string',
        isNotEmpty: 'The isbn cannot be empty',
        minLength: 'The isbn must have 13 characteres',
        maxLength: 'The isbn must have 13 characteres',
      },
      isNotEmpty: true,
    },
    quantity: {
      type: 'integer',
      errorMessage: {
        type: 'The quantity must be integer',
      },
    },
    movement_type: {
      type: 'string',
      errorMessage: {
        type: 'The movement_type must be string',
        isNotEmpty: 'The movement_type cannot be empty',
      },
      isNotEmpty: true,
    },
  },
  required: ['id_user', 'isbn', 'quantity', 'movement_type'],
  errorMessage: {
    required: {
      id_user: 'The id_user is required',
      isbn: 'The isbn is required',
      quantity: 'The quantity is required',
      movement_type: 'The movement_type is required',
    },
  },
};

export default updateBooksRecordSchema;

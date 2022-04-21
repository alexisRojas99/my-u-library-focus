const createNewBookSchema = {
  type: 'object',
  properties: {
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
    title: {
      type: 'string',
      errorMessage: {
        type: 'The title must be string',
        isNotEmpty: 'The title cannot be empty',
      },
      isNotEmpty: true,
    },
    author: {
      type: 'string',
      errorMessage: {
        type: 'The author must be string',
        isNotEmpty: 'The author cannot be empty',
      },
      isNotEmpty: true,
    },
    published_year: {
      type: 'integer',
      errorMessage: {
        type: 'The published_year must be integer',
      },
    },
    genre: {
      type: 'string',
      errorMessage: {
        type: 'The genre must be string',
        isNotEmpty: 'The genre cannot be empty',
      },
      isNotEmpty: true,
    },
    stock: {
      type: 'integer',
      maximum: 99,
      minimum: 0,
      errorMessage: {
        type: 'The stock must be integer',
        maximum: 'The stock cannot be greater than 99',
        minimum: 'The stock cannot be lower than 0',
      },
    },
  },
  required: ['isbn', 'title', 'author', 'published_year', 'genre', 'stock'],
  errorMessage: {
    required: {
      isbn: 'The isbn is required',
      title: 'The title is required',
      author: 'The author is required',
      published_year: 'The published_year is required',
      genre: 'The genre is required',
      stock: 'The stock is required',
    },
  },
};

export default createNewBookSchema;

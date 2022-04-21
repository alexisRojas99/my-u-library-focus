import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import AjvErrors from 'ajv-errors';

const ajv = new Ajv({ allErrors: true });

ajv.addKeyword({
  keyword: 'isNotEmpty',
  type: 'string',
  validate: (schema, data) => typeof data === 'string' && data.trim() !== '',
});

addFormats(ajv);
AjvErrors(ajv);

export default ajv;

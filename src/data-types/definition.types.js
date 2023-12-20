module.exports = {
  string: {
    name: 'string',
    default: '',
  },
  number: {
    name: 'number',
    default: 0,
  },
  array: {
    name: 'array',
    default: [],
  },
  object: {
    name: 'object',
    default: {},
  },
  timestamp: {
    name: 'date',
    default: new Date().getTime() + '',
  },
  date: {
    name: 'date',
    default: new Date(),
  },
  boolean: {
    name: 'boolean',
    default: false,
  },
  serial: {
    name: 'serial',
    default: '',
  },
  bigserial: {
    name: 'bigserial',
    default: '',
  }
};

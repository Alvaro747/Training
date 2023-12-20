class ProductsService {
  constructor(dependencies) {
    /* Base Properties */
    this._dependencies = dependencies;
    this._db = dependencies.db;
    this._crypto = this._dependencies.crypto;
    this._models = dependencies.models;
    this._utilities = dependencies.utilities;
    this._console = this._dependencies.console;
    this._services = this._dependencies.services;

    /* Custom Properties */
    this._tableName = 'products';
  }

  async create(data) {
    try {
      if (!data || !data.name) {
        return { response: { error: 'Please provide a name', status: 400 } };
      }

      data.id = this.#idGenerator({ length: 15, prefix: 'prod-' });

      const entity = new this._models.ProductsModel(data, this._dependencies);
      const transactionResponse = await this._db.transaction.create({
        tableName: this._tableName,
        entity: entity.get,
      });

      if (!transactionResponse) {
        this._console.error(transactionResponse);
        return { response: { error: 'error to create product', status: 500 } };
      }

      return { response: { data: entity.get, status: 200 } };
    } catch (error) {
      this._console.error(error);
      return { response: { error: 'Please provide a name', status: 400 } };
    }
  }

  async update(data) {
    try {
      if (!data || !data.id) {
        return { response: { error: 'Please provide an id', status: 400 } };
      }

      const transactionResponse = await this._db.transaction.update({
        tableName: this._tableName,
        entity: data.body,
      });

      if (!transactionResponse) {
        this._console.error(transactionResponse);
        return { response: { error: 'Error to Update product', status: 400 } };
      }

      return { response: { data: data.body, status: 200 } };
    } catch (error) {
      this._console.error(error);
      return { response: { error: 'Error to request', status: 400 } };
    }
  }

  async get(data) {
    try {
      if (!data || !data.queryselector) {
        return {
          response: { error: 'Please provide a queryselector', status: 400 },
        };
      }

      let response = {};

      switch (data.queryselector) {
        case 'id':
          response = await this.#getById(data);
          break;
        case 'all':
          response = await this.#getAll(data);
          break;
        default:
          response = {
            response: { error: 'Provide a valid slug to query', status: 400 },
          };

          break;
      }

      return response;
    } catch (error) {
      this._console.error(error);
      return { response: { error: 'Error to request', status: 400 } };
    }
  }

  async delete(data) {
    try {
      if (!data || !data.id) {
        return { response: { error: 'Please provide an Id', status: 400 } };
      }

      const transactionResponse = await this._db.transaction.delete({
        tableName: this._tableName,
        id: data.id,
      });

      if (!transactionResponse) {
        this._console.error(transactionResponse);
        return { response: { error: 'Please provide a id', status: 400 } };
      }

      return { response: { data: data.id, status: 200 } };
    } catch (error) {
      this._console.error(error);
      return { response: { error: 'Please provide a id', status: 400 } };
    }
  }

  async #getById(data) {
    try {
      if (!data || !data.search) {
        return {
          response: { error: 'Please provide query to search', status: 400 },
        };
      }

      const transactionResponse = await this._db.transaction.findById({
        tableName: this._tableName,
        id: data.search,
      });

      return { response: { data: transactionResponse, status: 200 } };
    } catch (error) {
      this._console.error(error);
      return { response: { error: 'Error to find product', status: 400 } };
    }
  }

  async #getAll() {
    try {
      const transactionResponse = await this._db.transaction.getAll({
        tableName: this._tableName,
      });

      return { response: { data: transactionResponse, status: 200 } };
    } catch (error) {
      this._console.error(error);
      return { response: { error: 'Error to request', status: 400 } };
    }
  }

  #idGenerator({ length, prefix }) {
    // Generate 256 random bytes and converted to hex to prevent failures on unscaped chars
    const buffer = this._crypto.randomBytes(256);
    const randomToken = buffer.toString('hex');
    // Generating of token
    return `${prefix || 'id-'}${randomToken.slice(0, length || 15)}`;
  }
}

module.exports = ProductsService;

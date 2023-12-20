class UserApiService {
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
    this._tableName = 'user-api';
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

  async #getById(data) {
    try {
      if (!data || !data.search) {
        return {
          response: { error: 'Please provide query to search', status: 400 },
        };
      }

      const remoteApiService = new this._services.RemoteApiService(
        this._dependencies,
      );

      const remoteResponse = await remoteApiService.request({
        url: `https://jsonplaceholder.typicode.com/users/${data.search}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      return { response: { data: remoteResponse.data, status: 200 } };
    } catch (error) {
      this._console.error(error);
      return { response: { error: 'Error to find product', status: 400 } };
    }
  }

  async #getAll() {
    try {
      const remoteApiService = new this._services.RemoteApiService(
        this._dependencies,
      );

      const remoteResponse = await remoteApiService.request({
        url: 'https://jsonplaceholder.typicode.com/users',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      return { response: { data: remoteResponse.data, status: 200 } };
    } catch (error) {
      this._console.error(error);
      return { response: { error: 'Error to request', status: 400 } };
    }
  }
}

module.exports = UserApiService;

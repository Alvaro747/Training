const dataSources = [
  {
    name: 'mongodb',
    path: 'mongodb/mongodb-data-source',
    handler: 'MongodbDataSource',
    customDependencyName: 'mongodb',
  },
];

module.exports = dataSources;

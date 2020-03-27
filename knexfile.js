const ENV = process.env.NODE_ENV || 'development';
const { DB_URL } = process.env;
const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfigs = {
  development: { connection: { database: 'db_name' } },
  test: { connection: { database: 'db_name_test' } }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };

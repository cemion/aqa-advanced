const axios = require('axios');

const MAX_LOG_LENGTH = 300;

const toJson = (value) => (value === undefined ? '' : JSON.stringify(value));

const truncate = (text) =>
  text.length > MAX_LOG_LENGTH ? `${text.slice(0, MAX_LOG_LENGTH)}...` : text;

const createApiClient = (baseURL) => {
  const client = axios.create({
    baseURL,
    timeout: 10000,
    validateStatus: () => true,
  });

  client.interceptors.request.use((config) => {
    config.metadata = { startTime: Date.now() };
    const url = `${config.baseURL}${config.url}`;
    const params = config.params ? ` params=${toJson(config.params)}` : '';
    const body = config.data ? ` body=${toJson(config.data)}` : '';
    console.log(`[REQUEST]  ${config.method.toUpperCase()} ${url}${params}${body}`);
    return config;
  });

  client.interceptors.response.use(
    (response) => {
      const { config, status, statusText, data } = response;
      const duration = Date.now() - config.metadata.startTime;
      console.log(
        `[RESPONSE] ${config.method.toUpperCase()} ${config.url} -> ${status} ${statusText} ` +
          `(${duration} ms) data=${truncate(toJson(data))}`,
      );
      return response;
    },
    (error) => {
      const { config } = error;
      const target = config ? `${config.method.toUpperCase()} ${config.url}` : 'unknown request';
      console.error(`[RESPONSE ERROR] ${target} -> ${error.message}`);
      return Promise.reject(error);
    },
  );

  return client;
};

module.exports = { createApiClient };

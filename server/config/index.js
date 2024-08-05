const { config } = require('dotenv');
const dev = process.env.NODE_ENV !== 'production';
config({
  path: `.env.${dev ? 'development' : process.env.NODE_ENV}`,
  override: true,
});

const { NODE_ENV } = process.env;
module.exports = {
  NODE_ENV,
};
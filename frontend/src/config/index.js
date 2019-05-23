const configuration = process.env.BUILD_CONFIG;
console.log('configuration',configuration)

const defaultConfig = require('./default');
const config = require(`./config_${configuration}`);

module.exports = Object.assign(defaultConfig, config);

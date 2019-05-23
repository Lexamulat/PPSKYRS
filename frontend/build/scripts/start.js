const logger = require('../lib/logger');

logger.info('Starting server...');
require('../../server/main').listen(3000, () => {
    const protocol = process.env.HTTPS ? 'https' : 'http';
    logger.success('Server is running at ' + protocol + '://localhost:3000');
});
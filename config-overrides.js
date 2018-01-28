/* config-overrides.js */
const theme = require('./src/theme');
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
   config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
   config = rewireLess.withLoaderOptions({
     modifyVars: theme,
   })(config, env);
    return config;
};
